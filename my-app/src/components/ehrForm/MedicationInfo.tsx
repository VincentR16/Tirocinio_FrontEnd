import {
  Flex,
  Select,
  Textarea,
  Button,
  Stack,
  Center,
  Pill,
  Text,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import { Controller, useForm } from "react-hook-form";
import { MedicationSelect } from "../MedicalSelect";
import { TermsTypeEnum } from "../../types/TermsType";
import type { MedicationItem } from "../../context/EhrContext";

// Form separato per il singolo elemento
const emptyMedication: MedicationItem = {
  medication: "",
  medicationId: "",
  statusMedication: "active",
  dosageInstructions: "",
  route: "oral",
  startDate: "",
  endDate: "",
  reasonMedication: "",
};

export default function MedicationInfo() {
  const { medications, addMedication, removeMedication } = useEhrContext();

  // Form separato per gestire l'input del singolo farmaco
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MedicationItem>({
    defaultValues: emptyMedication,
  });

  const currentMedication = watch();

  const onSubmit = (data: MedicationItem) => {
    // Genera un ID se non presente
    const medicationWithId = {
      ...data,
      medicationId: data.medicationId || `med-${Date.now()}`,
    };

    const success = addMedication(medicationWithId);
    if (success) {
      reset(emptyMedication); // Reset del form dopo l'aggiunta
    }
  };

  // Controlla se il form corrente è valido
  const isCurrentFormValid =
    currentMedication?.medication?.trim() !== "" &&
    currentMedication?.statusMedication?.trim() !== "" &&
    currentMedication?.dosageInstructions?.trim() !== "" &&
    currentMedication?.startDate?.trim() !== "";

  return (
    <>
      {/* Form per inserire un nuovo farmaco */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="row" gap="xl" className={classes.container} mb="md">
          {/* Prima colonna */}
          <Flex ml="lg" direction="column" className={classes.subContainer}>
            <Controller
              control={control}
              name="medication"
              render={({ field }) => (
                <MedicationSelect
                  label="Medication"
                  termsType={TermsTypeEnum.MEDICATION}
                  placeholder="e.g. Aspirin, Lisinopril"
                  value={field.value}
                  onChange={field.onChange}
                  onCodeChange={(code) => {
                    // Imposta l'ID del farmaco quando viene selezionato
                    setValue("medicationId", code);
                  }}
                  error={errors.medication?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="statusMedication"
              render={({ field }) => (
                <Select
                  mt="md"
                  withAsterisk
                  label="Status"
                  placeholder="Select status"
                  data={[
                    "active",
                    "completed",
                    "entered-in-error",
                    "intended",
                    "stopped",
                    "on-hold",
                    "unknown",
                  ]}
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  error={errors.statusMedication?.message}
                  clearable
                />
              )}
            />

            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DateInput
                  mt="md"
                  withAsterisk
                  label="Start Date"
                  placeholder="Select start date"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.toString().split("T")[0] : "")
                  }
                  error={errors.startDate?.message}
                />
              )}
            />
          </Flex>

          {/* Seconda colonna */}
          <Flex direction="column" className={classes.subContainer}>
            <Controller
              control={control}
              name="dosageInstructions"
              render={({ field }) => (
                <Textarea
                  mt="md"
                  withAsterisk
                  label="Dosage Instructions"
                  placeholder="e.g. Take 1 tablet twice daily with meals"
                  autosize
                  minRows={4.5}
                  maxRows={4.5}
                  {...field}
                  error={errors.dosageInstructions?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DateInput
                  mt="md"
                  label="End Date"
                  placeholder="Select end date (optional)"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.toString().split("T")[0] : "")
                  }
                  error={errors.endDate?.message}
                />
              )}
            />
          </Flex>

          {/* Terza colonna */}

          <Flex direction="column" className={classes.subContainer}>
            <Controller
              control={control}
              name="route"
              render={({ field }) => (
                <Select
                  mt="md"
                  label="Route"
                  placeholder="Select route of administration"
                  data={[
                    "oral",
                    "intravenous",
                    "subcutaneous",
                    "topical",
                    "nasal",
                    "ophthalmic",
                    "transdermal",
                    "rectal",
                    "sublingual",
                    "other",
                  ]}
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  error={errors.route?.message}
                  clearable
                />
              )}
            />
            <Controller
              control={control}
              name="medicationId"
              render={({ field }) => (
                <TextInput
                  mt="md"
                  readOnly={true}
                  label="Medication ID"
                  placeholder="Auto-generated or manual ID"
                  {...field}
                  error={errors.medicationId?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="reasonMedication"
              render={({ field }) => (
                <Textarea
                  mt="md"
                  label="Reason / Indication"
                  placeholder="Why is this medication prescribed?"
                  autosize
                  minRows={1}
                  maxRows={1}
                  {...field}
                  error={errors.reasonMedication?.message}
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
              Add Medication
            </Button>
          </Center>
        </Stack>
      </form>

      {/* Lista dei farmaci salvati */}
      {medications.length > 0 && (
        <Center>
          <Stack align="center" gap="xs">
            <Text size="sm" c="dimmed">
              Added Medications ({medications.length}):
            </Text>
            <Pill.Group>
              {medications.map((medication, index) => (
                <Pill
                  key={`${medication.medication}-${index}`}
                  withRemoveButton
                  onRemove={() => removeMedication(index)}
                >
                  {medication.medication}
                  {medication.statusMedication &&
                    ` (${medication.statusMedication})`}
                </Pill>
              ))}
            </Pill.Group>
          </Stack>
        </Center>
      )}

      {medications.length === 0 && (
        <Center mt="md">
          <Text size="sm" c="dimmed">
            No medications added yet. Fill the form above and click "Add
            Medication" or just click "Next step".
          </Text>
        </Center>
      )}
    </>
  );
}
