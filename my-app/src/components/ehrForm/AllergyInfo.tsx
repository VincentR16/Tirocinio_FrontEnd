import {
  Flex,
  TextInput,
  Select,
  Textarea,
  Button,
  Stack,
  Center,
  Pill,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import  { Controller } from "react-hook-form";

export default function AllergyInfo() {
    const {
      register,
      control,
      formState: { errors },
    } = useEhrContext();
    
  const pills = Array(10)
    .fill(0)
    .map((_, index) => (
      <Pill key={index} withRemoveButton>
        Item {index}
      </Pill>
    ));
  return (
    <>
      <Flex direction="row" gap="xl" className={classes.container}>
        <Flex ml="lg" direction="column" className={classes.subContainer}>
          <TextInput
            mt="md"
            label="Substance"
            placeholder="e.g. Penicillin, Peanuts"
            withAsterisk
            {...register("substance")}
            error={errors.substance?.message}
          />

          <Controller
            control={control}
            name="clinicalStatus"
            render={({ field }) => (
              <Select
                mt="md"
                label="Clinical Status"
                placeholder="Status"
                data={["active", "inactive", "resolved"]}
                withAsterisk
                {...field}
                error={errors.clinicalStatus?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="verificationStatus"
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
                withAsterisk
                {...field}
                error={errors.verificationStatus?.message}
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
                placeholder="Severity level"
                data={["low", "high", "unable-to-assess"]}
                {...field}
                error={errors.criticality?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="reactionDescription"
            render={({ field }) => (
              <Textarea
                mt="md"
                label="Reaction Description"
                placeholder="e.g. Rash, Anaphylaxis"
                autosize
                minRows={1}
                maxRows={3}
                {...field}
                error={errors.reactionDescription?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="onsetDate"
            render={({ field }) => (
              <DatePickerInput
                mt="md"
                label="Onset Date"
                placeholder="When did the reaction start?"
                value={field.value || null}
                onChange={field.onChange}
                error={errors.onsetDate?.message}
              />
            )}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                mt="md"
                label="Type"
                placeholder="Select type"
                data={["allergy", "intolerance"]}
                {...field}
                error={errors.type?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                mt="md"
                label="Category"
                placeholder="Category"
                data={["food", "medication", "environment", "biologic"]}
                {...field}
                error={errors.category?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="recordedDate"
            render={({ field }) => (
              <DatePickerInput
                mt="md"
                label="Recorded Date"
                placeholder="When was it recorded?"
                value={field.value || null}
                onChange={field.onChange}
                error={errors.recordedDate?.message}
              />
            )}
          />
        </Flex>
      </Flex>
      <Stack>
        <Center>
          <Button w="10rem">Add Allergy</Button>
        </Center>
        <Center mt="xl">
          <Pill.Group>{pills}</Pill.Group>
        </Center>
      </Stack>
    </>
  );
  //todo
}
