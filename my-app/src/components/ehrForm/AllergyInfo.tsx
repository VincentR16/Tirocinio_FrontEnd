/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Flex,
  TextInput,
  Select,
  Textarea,
  Button,
  Stack,
  Center,
  Pill,
  Text,
} from "@mantine/core";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import { Controller, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

const emptyAllergy = {
  substance: "",
  clinicalStatus: "",
  criticality: "",
  typeAllergy: "",
  reactionDescription: "",
  category: "",
  verificationStatus: "",
  onsetDate: "",
  recordedDate: "",
};

export default function AllergyInfo() {
  const {
    register,
    control,
    handleNextStep,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useEhrContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "allergies",
  });

  // Watch del form corrente (sempre indice 0)
  const currentAllergy = watch("allergies.0");

  useEffect(() => {
    if (fields.length === 0) {
      append(emptyAllergy);
    }
  }, [fields.length, append]);

  const addAllergy = async () => {
    try {
      // Valida solo il form corrente
      await handleNextStep();

      const values = getValues();
      const currentAllergyData = values.allergies[0];

      // Controlla se c'è già un'allergia con la stessa sostanza
      const existingAllergies = fields.slice(1); // Escludi il form corrente (indice 0)
      const isDuplicate = existingAllergies.some(
        (allergy) =>
          allergy.substance?.toLowerCase().trim() ===
          currentAllergyData.substance?.toLowerCase().trim()
      );

      if (isDuplicate) {
        notifications.show({
          title: "Error!",
          color: "red",
          message: "There is already a allergy with the same substance",
          autoClose: 3500,
          position: "top-right",
        });
        return;
      }

      // Aggiungi l'allergia alla lista (diventerà una pillola)
      append({ ...currentAllergyData });

      // Reset solo del primo elemento dell'array (form corrente)
      // Usa setValue per aggiornare solo l'indice 0
      Object.keys(emptyAllergy).forEach((key) => {
        setValue(`allergies.0.${key}` as any, (emptyAllergy as any)[key]);
      });
    } catch (error) {
      console.warn("Validation failed, cannot add allergy", error);
    }
  };

  const removeAllergy = (indexToRemove: number) => {
    // Non rimuovere mai l'indice 0 (il form corrente)
    if (indexToRemove > 0) {
      remove(indexToRemove);
    }
  };

  // Allergie salvate (escludi il form corrente)
  const savedAllergies = fields
    .slice(1)
    .filter((allergy) => allergy.substance?.trim() !== "");

  // Controlla se il form corrente è compilato
  const isCurrentFormValid =
    currentAllergy?.substance?.trim() !== "" &&
    currentAllergy?.category?.trim() !== "";

  return (
    <>
      {/* Form per inserire una nuova allergia */}
      <Flex direction="row" gap="xl" className={classes.container} mb="xl">
        <Flex ml="lg" direction="column" className={classes.subContainer}>
          <TextInput
            mt="md"
            label="Substance"
            withAsterisk
            placeholder="e.g. Penicillin, Peanuts"
            {...register("allergies.0.substance")}
            error={errors.allergies?.[0]?.substance?.message}
          />

          <Controller
            control={control}
            name="allergies.0.category"
            render={({ field }) => (
              <Select
                mt="md"
                withAsterisk
                label="Category"
                placeholder="Select category"
                data={["food", "medication", "environment", "biologic"]}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                error={errors.allergies?.[0]?.category?.message}
                clearable
              />
            )}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name="allergies.0.criticality"
            render={({ field }) => (
              <Select
                mt="md"
                label="Criticality"
                placeholder="Select severity level"
                data={["low", "high", "unable-to-assess"]}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                error={errors.allergies?.[0]?.criticality?.message}
                clearable
              />
            )}
          />

          <Controller
            control={control}
            name="allergies.0.typeAllergy"
            render={({ field }) => (
              <Select
                mt="md"
                label="Type"
                placeholder="Select type"
                data={["allergy", "intolerance"]}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                error={errors.allergies?.[0]?.typeAllergy?.message}
                clearable
              />
            )}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name="allergies.0.reactionDescription"
            render={({ field }) => (
              <Textarea
                mt="md"
                label="Reaction Description"
                placeholder="e.g. Rash, Anaphylaxis"
                autosize
                minRows={3}
                maxRows={5}
                {...field}
                error={errors.allergies?.[0]?.reactionDescription?.message}
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
            onClick={addAllergy}
            disabled={!isCurrentFormValid}
          >
            Add Allergy
          </Button>
        </Center>

        {/* Pillole delle allergie salvate */}
        {savedAllergies.length > 0 && (
          <Center mt="md">
            <Stack align="center" gap="xs">
              <Text size="sm" c="dimmed">
                Added Allergies ({savedAllergies.length}):
              </Text>
              <Pill.Group>
                {savedAllergies.map((allergy, index: number) => {
                  const actualIndex = index + 1; // +1 perché saltiamo l'indice 0
                  return (
                    <Pill
                      key={`${allergy.substance}-${actualIndex}`}
                      withRemoveButton
                      onRemove={() => removeAllergy(actualIndex)}
                    >
                      {allergy.substance}
                      {allergy.category && ` (${allergy.category})`}
                    </Pill>
                  );
                })}
              </Pill.Group>
            </Stack>
          </Center>
        )}

        {savedAllergies.length === 0 && (
          <Center mt="md">
            <Text size="sm" c="dimmed">
              No allergies added yet. Fill the form above and click "Add
              Allergy" or just click "Next step".
            </Text>
          </Center>
        )}
      </Stack>
    </>
  );
}
