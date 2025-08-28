import {
  Flex,
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
import { Controller, useForm } from "react-hook-form";
import { MedicationSelect } from "../MedicalSelect";
import { TermsTypeEnum } from "../../types/TermsType";
import type { AllergyItem } from "../../context/EhrContext";

// Form separato per il singolo elemento
const emptyAllergy: AllergyItem = {
  substance: "",
  code: "",
  criticality: "",
  typeAllergy: "",
  reactionDescription: "",
  category: "",
};

export default function AllergyInfo() {
  const { allergies, addAllergy, removeAllergy } = useEhrContext();

  // Form separato per gestire l'input della singola allergia
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AllergyItem>({
    defaultValues: emptyAllergy,
  });

  const currentAllergy = watch();

  const onSubmit = (data: AllergyItem) => {
    const success = addAllergy(data);
    if (success) {
      reset(emptyAllergy); // Reset del form dopo l'aggiunta
    }
  };

  // Controlla se il form corrente è valido
  const isCurrentFormValid =
    currentAllergy?.substance?.trim() !== "" &&
    currentAllergy?.category?.trim() !== "" &&
    currentAllergy?.code?.trim() !== "";

  return (
    <>
      {/* Form per inserire una nuova allergia */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="row" gap="xl" className={classes.container} mb="xl">
          <Flex ml="lg" direction="column" className={classes.subContainer}>
            <Controller
              control={control}
              name="substance"
              render={({ field }) => (
                <MedicationSelect
                  label="Allergy"
                  termsType={TermsTypeEnum.ALLERGY}
                  placeholder="e.g. Penicillin, Peanuts"
                  value={field.value}
                  onChange={field.onChange}
                  onCodeChange={(code) => {
                    setValue("code", code);
                  }}
                  error={errors.substance?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
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
                  error={errors.category?.message}
                  clearable
                />
              )}
            />
          </Flex>

          <Flex direction="column" className={classes.subContainer}>
            <Controller
              control={control}
              name="criticality"
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
                  error={errors.criticality?.message}
                  clearable
                />
              )}
            />

            <Controller
              control={control}
              name="typeAllergy"
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
                  error={errors.typeAllergy?.message}
                  clearable
                />
              )}
            />
          </Flex>

          <Flex direction="column" className={classes.subContainer}>
            <Controller
              control={control}
              name="reactionDescription"
              render={({ field }) => (
                <Textarea
                  mt="md"
                  label="Reaction Description"
                  placeholder="e.g. Rash, Anaphylaxis"
                  autosize
                  minRows={4.5}
                  maxRows={5}
                  {...field}
                  error={errors.reactionDescription?.message}
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
              Add Allergy
            </Button>
          </Center>
        </Stack>
      </form>

      {/* Lista delle allergie salvate */}
      {allergies.length > 0 && (
        <Center mt="md">
          <Stack align="center" gap="xs">
            <Text size="sm" c="dimmed">
              Added Allergies ({allergies.length}):
            </Text>
            <Pill.Group>
              {allergies.map((allergy, index) => (
                <Pill
                  key={`${allergy.substance}-${index}`}
                  withRemoveButton
                  onRemove={() => removeAllergy(index)}
                >
                  {allergy.substance}
                  {allergy.category && ` (${allergy.category})`}
                </Pill>
              ))}
            </Pill.Group>
          </Stack>
        </Center>
      )}

      {allergies.length === 0 && (
        <Center mt="md">
          <Text size="sm" c="dimmed">
            No allergies added yet. Fill the form above and click "Add
            Allergy" or just click "Next step".
          </Text>
        </Center>
      )}
    </>
  );
}