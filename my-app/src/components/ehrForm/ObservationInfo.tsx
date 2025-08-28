/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Flex,
  Select,
  NumberInput,
  Textarea,
  Stack,
  Center,
  Button,
  Pill,
  Text,
  TextInput,
} from "@mantine/core";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import { Controller, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { MedicationSelect } from "../MedicalSelect";
import { TermsTypeEnum } from "../../types/TermsType";

const emptyObservation = {
  statusObservation: "",
  categoryObservation: "",
  code: "",
  codeObservation: "", // Aggiungi questo campo per salvare il codice di sistema
  value: 0,
  unit: "",
  effectiveDateTime: "",
  issuedAt: "",
  performer: "",
  comment: "",
};

export default function ObservationInfo() {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useEhrContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "observations",
  });

  // Watch del form corrente (sempre indice 0)
  const currentObservation = watch("observations.0");

  useEffect(() => {
    if (fields.length === 0) {
      append(emptyObservation);
    }
  }, [fields.length, append]);

  const addObservation = async () => {
    try {
      const values = getValues();
      const currentObservationData = values.observations[0];

      // Validazione manuale dei campi obbligatori
      if (!currentObservationData.statusObservation?.trim()) {
        notifications.show({
          title: "Error!",
          color: "red",
          message: "Status is required",
          autoClose: 3500,
          position: "bottom-right",
        });
        return;
      }

      if (!currentObservationData.categoryObservation?.trim()) {
        notifications.show({
          title: "Error!",
          color: "red",
          message: "Category is required",
          autoClose: 3500,
          position: "bottom-right",
        });
        return;
      }

      if (!currentObservationData.code?.trim()) {
        notifications.show({
          title: "Error!",
          color: "red",
          message: "Code is required",
          autoClose: 3500,
          position: "bottom-right",
        });
        return;
      }

      if (!currentObservationData.codeObservation?.trim()) {
        notifications.show({
          title: "Error!",
          color: "red",
          message: "Please select a valid code from the list",
          autoClose: 3500,
          position: "bottom-right",
        });
        return;
      }

      if (!currentObservationData.unit?.trim()) {
        notifications.show({
          title: "Error!",
          color: "red",
          message: "Unit is required",
          autoClose: 3500,
          position: "bottom-right",
        });
        return;
      }

      // Controlla se c'è già un'osservazione con lo stesso codice
      const existingObservations = fields.slice(1); // Escludi il form corrente (indice 0)
      const isDuplicate = existingObservations.some(
        (observation) =>
          observation.code?.toLowerCase().trim() ===
          currentObservationData.code?.toLowerCase().trim()
      );

      if (isDuplicate) {
        notifications.show({
          title: "Error!",
          color: "red",
          message: "There is already an observation with the same code",
          autoClose: 3500,
          position: "bottom-right",
        });
        return;
      }

      // Aggiungi l'osservazione alla lista
      append({ ...currentObservationData });

      // Reset del form corrente
      Object.keys(emptyObservation).forEach((key) => {
        setValue(
          `observations.0.${key}` as any,
          (emptyObservation as any)[key],
          { shouldValidate: false }
        );
      });

      notifications.show({
        title: "Success!",
        color: "green",
        message: "Observation added successfully",
        autoClose: 2000,
        position: "bottom-right",
      });
    } catch (error) {
      console.warn("Failed to add observation", error);
    }
  };

  const removeObservation = (indexToRemove: number) => {
    // Non rimuovere mai l'indice 0 (il form corrente)
    if (indexToRemove > 0) {
      remove(indexToRemove);
    }
  };

  // Osservazioni salvate (escludi il form corrente)
  const savedObservations = fields
    .slice(1)
    .filter((observation) => observation.code?.trim() !== "");

  // Controlla se il form corrente è compilato e valido
  const isCurrentFormValid =
    currentObservation?.code?.trim() !== "" &&
    currentObservation?.statusObservation?.trim() !== "" &&
    currentObservation?.categoryObservation?.trim() !== "" &&
    currentObservation?.unit?.trim() !== "" &&
    currentObservation?.codeObservation?.trim() !== ""; // Il codeSystem deve essere presente

  return (
    <>
      {/* Form per inserire una nuova osservazione */}
      <Flex direction="row" gap="xl" className={classes.container} mb="md">
        <Flex ml="lg" direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name="observations.0.statusObservation"
            render={({ field }) => (
              <Select
                mt="md"
                label="Status"
                withAsterisk
                placeholder="Select status"
                data={["registered", "preliminary", "final", "amended"]}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                error={errors.observations?.[0]?.statusObservation?.message}
                clearable
              />
            )}
          />

          <Controller
            control={control}
            name="observations.0.categoryObservation"
            render={({ field }) => (
              <Select
                withAsterisk
                mt="md"
                label="Category"
                placeholder="Select category"
                data={[
                  "vital-signs",
                  "laboratory", 
                  "social-history",
                  "imaging",
                ]}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                error={errors.observations?.[0]?.categoryObservation?.message}
                clearable
              />
            )}
          />

          <Controller
            control={control}
            name="observations.0.code"
            render={({ field }) => (
              <MedicationSelect
                label="Code"
                termsType={TermsTypeEnum.OBSERVATION}
                placeholder="e.g. Blood Pressure, Glucose"
                value={field.value}
                onChange={field.onChange}
                onCodeChange={(code) => {
                  // Imposta il codice di sistema quando viene selezionato un elemento
                  setValue("observations.0.codeObservation", code);
                }}
                error={errors.observations?.[0]?.code?.message}
              />
            )}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name="observations.0.value"
            render={({ field }) => (
              <NumberInput
                withAsterisk
                mt="md"
                label="Value"
                placeholder="Numerical result"
                value={field.value || 0}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.observations?.[0]?.value?.message}
              />
            )}
          />

          <TextInput
            mt="md"
            withAsterisk
            label="Unit"
            placeholder="e.g. mmHg, °C, mg/dL"
            {...register("observations.0.unit")}
            error={errors.observations?.[0]?.unit?.message}
          />

          <TextInput
            mt="md"
            label="Performer"
            placeholder="Doctor or device (optional)"
            {...register("observations.0.performer")}
            error={errors.observations?.[0]?.performer?.message}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name="observations.0.comment"
            render={({ field }) => (
              <Textarea
                mt="md"
                label="Comments / Notes"
                placeholder="Any relevant note or remark"
                autosize
                minRows={8}
                maxRows={8}
                {...field}
                error={errors.observations?.[0]?.comment?.message}
              />
            )}
          />
        </Flex>
      </Flex>

      <Stack>
        <Center>
          <Button
            color="green"
            w="12rem"
            onClick={addObservation}
            disabled={!isCurrentFormValid}
          >
            Add Observation
          </Button>
        </Center>

        {/* Pillole delle osservazioni salvate */}
        {savedObservations.length > 0 && (
          <Center>
            <Stack align="center" gap="xs">
              <Text size="sm" c="dimmed">
                Added Observations ({savedObservations.length}):
              </Text>
              <Pill.Group>
                {savedObservations.map((observation, index: number) => {
                  const actualIndex = index + 1; // +1 perché saltiamo l'indice 0
                  return (
                    <Pill
                      key={`${observation.code}-${actualIndex}`}
                      withRemoveButton
                      onRemove={() => removeObservation(actualIndex)}
                    >
                      {observation.code}
                      {observation.categoryObservation &&
                        ` (${observation.categoryObservation})`}
                    </Pill>
                  );
                })}
              </Pill.Group>
            </Stack>
          </Center>
        )}

        {savedObservations.length === 0 && (
          <Center mt="md">
            <Text size="sm" c="dimmed">
              No observations added yet. Fill the form above and click "Add
              Observation" or just click "Next step".
            </Text>
          </Center>
        )}
      </Stack>
    </>
  );
}