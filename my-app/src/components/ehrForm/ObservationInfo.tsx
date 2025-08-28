
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
import { Controller, useForm } from "react-hook-form";
import { MedicationSelect } from "../MedicalSelect";
import { TermsTypeEnum } from "../../types/TermsType";
import type { ObservationItem } from "../../context/EhrContext";

// Form separato per il singolo elemento
const emptyObservation: ObservationItem = {
  statusObservation: "",
  categoryObservation: "",
  code: "",
  codeObservation: "", // Campo per salvare il codice di sistema
  value: 0,
  unit: "",
  performer: "",
  comment: "",
};

export default function ObservationInfo() {
  const { observations, addObservation, removeObservation } = useEhrContext();

  // Form separato per gestire l'input della singola osservazione
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ObservationItem>({
    defaultValues: emptyObservation,
  });

  const currentObservation = watch();

  const onSubmit = (data: ObservationItem) => {
    const success = addObservation(data);
    if (success) {
      reset(emptyObservation); // Reset del form dopo l'aggiunta
    }
  };

  // Controlla se il form corrente è valido
  const isCurrentFormValid =
    currentObservation?.code?.trim() !== "" &&
    currentObservation?.statusObservation?.trim() !== "" &&
    currentObservation?.categoryObservation?.trim() !== "" &&
    currentObservation?.unit?.trim() !== "" &&
    currentObservation?.codeObservation?.trim() !== "" && // Il codeSystem deve essere presente
    currentObservation?.value !== undefined &&
    currentObservation?.value >= 0;

  return (
    <>
      {/* Form per inserire una nuova osservazione */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="row" gap="xl" className={classes.container} mb="md">
          {/* Prima colonna */}
          <Flex ml="lg" direction="column" className={classes.subContainer}>
            <Controller
              control={control}
              name="statusObservation"
              render={({ field }) => (
                <Select
                  mt="md"
                  label="Status"
                  withAsterisk
                  placeholder="Select status"
                  data={["registered", "preliminary", "final", "amended", "corrected", "cancelled", "entered-in-error", "unknown"]}
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  error={errors.statusObservation?.message}
                  clearable
                />
              )}
            />

            <Controller
              control={control}
              name="categoryObservation"
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
                    "procedure",
                    "survey",
                    "exam",
                    "therapy"
                  ]}
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  error={errors.categoryObservation?.message}
                  clearable
                />
              )}
            />

            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <MedicationSelect
                  label="Code"
                  termsType={TermsTypeEnum.OBSERVATION}
                  placeholder="e.g. Blood Pressure, Glucose"
                  value={field.value}
                  onChange={field.onChange}
                  onCodeChange={(code) => {
                    // Imposta il codice di sistema quando viene selezionato un elemento
                    setValue("codeObservation", code);
                  }}
                  error={errors.code?.message}
                />
              )}
            />
          </Flex>

          {/* Seconda colonna */}
          <Flex direction="column" className={classes.subContainer}>
            <Controller
              control={control}
              name="value"
              render={({ field }) => (
                <NumberInput
                  withAsterisk
                  mt="md"
                  label="Value"
                  placeholder="Numerical result"
                  min={0}
                  step={0.01}
                  decimalScale={2}
                  value={field.value || 0}
                  onChange={(value) => field.onChange(value || 0)}
                  onBlur={field.onBlur}
                  error={errors.value?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="unit"
              render={({ field }) => (
                <TextInput
                  mt="md"
                  withAsterisk
                  label="Unit"
                  placeholder="e.g. mmHg, °C, mg/dL"
                  {...field}
                  error={errors.unit?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="performer"
              render={({ field }) => (
                <TextInput
                  mt="md"
                  label="Performer"
                  placeholder="Doctor or device (optional)"
                  {...field}
                  error={errors.performer?.message}
                />
              )}
            />
          </Flex>

          {/* Terza colonna */}
          <Flex direction="column" className={classes.subContainer}>
            <Controller
              control={control}
              name="comment"
              render={({ field }) => (
                <Textarea
                  mt="md"
                  label="Comments / Notes"
                  placeholder="Any relevant note or remark"
                  autosize
                  minRows={8}
                  maxRows={8}
                  {...field}
                  error={errors.comment?.message}
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
              type="submit"
              disabled={!isCurrentFormValid}
            >
              Add Observation
            </Button>
          </Center>
        </Stack>
      </form>

      {/* Lista delle osservazioni salvate */}
      {observations.length > 0 && (
        <Center>
          <Stack align="center" gap="xs">
            <Text size="sm" c="dimmed">
              Added Observations ({observations.length}):
            </Text>
            <Pill.Group>
              {observations.map((observation, index) => (
                <Pill
                  key={`${observation.code}-${index}`}
                  withRemoveButton
                  onRemove={() => removeObservation(index)}
                >
                  {observation.code}
                  {observation.categoryObservation &&
                    ` (${observation.categoryObservation})`}
                </Pill>
              ))}
            </Pill.Group>
          </Stack>
        </Center>
      )}

      {observations.length === 0 && (
        <Center mt="md">
          <Text size="sm" c="dimmed">
            No observations added yet. Fill the form above and click "Add
            Observation" or just click "Next step".
          </Text>
        </Center>
      )}
    </>
  );
}