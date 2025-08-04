import {
  Flex,
  TextInput,
  Select,
  Textarea,
  Button,
  Stack,
  Center,
  Pill,
  Group,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import { Controller, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

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
    trigger,
    formState: { errors },
  } = useEhrContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "allergies",
  });

  const index = fields.length - 1;
  useEffect(() => {
    if (fields.length === 0) {
      append(emptyAllergy);
    }
  }, [fields.length, append]);

  return (
    <>
      <Flex direction="row" gap="xl" className={classes.container} mb="xl">
        <Flex ml="lg" direction="column" className={classes.subContainer}>
          <TextInput
            mt="md"
            label="Substance"
            placeholder="e.g. Penicillin, Peanuts"
            {...register(`allergies.${index}.substance`)}
            error={errors.allergies?.[index]?.substance?.message}
          />

          <Controller
            control={control}
            name={`allergies.${index}.clinicalStatus`}
            render={({ field }) => (
              <Select
                mt="md"
                label="Clinical Status"
                placeholder="Status"
                data={["active", "inactive", "resolved"]}
                {...field}
                error={errors.allergies?.[index]?.clinicalStatus?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={`allergies.${index}.verificationStatus`}
            render={({ field }) => (
              <Select
                mt="md"
                label="Verification Status"
                placeholder="Verification"
                data={[
                  "unconfirmed",
                  "confirmed",
                  "refuted",
                  "entered-in-error",
                ]}
                {...field}
                error={errors.allergies?.[index]?.verificationStatus?.message}
              />
            )}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name={`allergies.${index}.criticality`}
            render={({ field }) => (
              <Select
                mt="md"
                label="Criticality"
                placeholder="Severity level"
                data={["low", "high", "unable-to-assess"]}
                {...field}
                error={errors.allergies?.[index]?.criticality?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={`allergies.${index}.reactionDescription`}
            render={({ field }) => (
              <Textarea
                mt="md"
                label="Reaction Description"
                placeholder="e.g. Rash, Anaphylaxis"
                autosize
                minRows={1}
                maxRows={3}
                {...field}
                error={errors.allergies?.[index]?.reactionDescription?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={`allergies.${index}.onsetDate`}
            render={({ field }) => (
              <DatePickerInput
                mt="md"
                label="Onset Date"
                placeholder="When did the reaction start?"
                value={field.value || null}
                onChange={field.onChange}
                error={errors.allergies?.[index]?.onsetDate?.message}
              />
            )}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name={`allergies.${index}.typeAllergy`}
            render={({ field }) => (
              <Select
                mt="md"
                label="Type"
                placeholder="Select type"
                data={["allergy", "intolerance"]}
                {...field}
                error={errors.allergies?.[index]?.typeAllergy?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={`allergies.${index}.category`}
            render={({ field }) => (
              <Select
                mt="md"
                label="Category"
                placeholder="Category"
                data={["food", "medication", "environment", "biologic"]}
                {...field}
                error={errors.allergies?.[index]?.category?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={`allergies.${index}.recordedDate`}
            render={({ field }) => (
              <DatePickerInput
                mt="md"
                label="Recorded Date"
                placeholder="When was it recorded?"
                value={field.value || null}
                onChange={field.onChange}
                error={errors.allergies?.[index]?.recordedDate?.message}
              />
            )}
          />
        </Flex>
      </Flex>

      <Stack>
        <Center>
          <Button
            w="10rem"
            onClick={async () => {
              const valid = await trigger([
                `allergies.${index}.substance`,
                `allergies.${index}.clinicalStatus`,
              ]);

              if (valid) {
                append(emptyAllergy);
              }
            }}
          >
            Add Allergy
          </Button>
        </Center>

        <Center mt="xs">
          <Pill.Group>
            {fields
              .filter((item) => item.substance?.trim() !== "")
              .map((item, idx) => (
                <Pill
                  key={item.id}
                  withRemoveButton
                  onRemove={() => remove(idx)}
                >
                  {item.substance}
                </Pill>
              ))}
          </Pill.Group>
        </Center>
      </Stack>
      <Center>
        <Group justify="center">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          {active < 7 ? (
            <Button onClick={handleNextStep}>Next step</Button>
          ) : (
            <>
              <Button color="green">Salva</Button>
            </>
          )}
        </Group>
      </Center>
    </>
  );
}
