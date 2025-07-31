import {
  Flex,
  Select,
  TextInput,
  NumberInput,
  Textarea,
  Stack,
  Center,
  Button,
  Pill,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import { Controller } from "react-hook-form";

export default function ObservationInfo() {
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
          <Controller
            control={control}
            name="statusObservation"
            render={({ field }) => (
              <Select
                mt="md"
                label="Status"
                placeholder="Select status"
                data={["registered", "preliminary", "final", "amended"]}
                withAsterisk
                {...field}
                error={errors.statusObservation?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="categoryObservation"
            render={({ field }) => (
              <Select
                mt="md"
                label="Category"
                placeholder="Select category"
                data={[
                  "vital-signs",
                  "laboratory",
                  "social-history",
                  "imaging",
                ]}
                withAsterisk
                {...field}
                error={errors.categoryObservation?.message}
              />
            )}
          />

          <TextInput
            mt="md"
            label="Code"
            placeholder="e.g. Blood Pressure, Glucose"
            withAsterisk
            {...register("code")}
            error={errors.code?.message}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name="value"
            render={({ field }) => (
              <NumberInput
                mt="md"
                label="Value"
                placeholder="Numerical result"
                withAsterisk
                {...field}
                error={errors.value?.message}
              />
            )}
          />

          <TextInput
            mt="md"
            label="Unit"
            placeholder="e.g. mmHg, °C, mg/dL"
            withAsterisk
            {...register("unit")}
            error={errors.unit?.message}
          />

          <Controller
            control={control}
            name="effectiveDateTime"
            render={({ field }) => (
              <DateTimePicker
                mt="md"
                label="Effective Date & Time"
                placeholder="When was it observed"
                withAsterisk
                value={field.value || null}
                onChange={field.onChange}
                error={errors.effectiveDateTime?.message}
              />
            )}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name="issuedAt"
            render={({ field }) => (
              <DateTimePicker
                mt="md"
                label="Issued At"
                placeholder="When was it recorded"
                value={field.value || null}
                onChange={field.onChange}
                error={errors.issuedAt?.message}
              />
            )}
          />

          <TextInput
            mt="md"
            label="Performer"
            placeholder="Doctor or device (optional)"
            {...register("performer")}
            error={errors.performer?.message}
          />

          <Controller
            control={control}
            name="comment"
            render={({ field }) => (
              <Textarea
                mt="md"
                label="Comments / Notes"
                placeholder="Any relevant note or remark"
                autosize
                minRows={1}
                maxRows={3}
                {...field}
                error={errors.comment?.message}
              />
            )}
          />
        </Flex>
      </Flex>
      <Stack>
        <Center>
          <Button w="10rem">Add Observation</Button>
        </Center>
        <Center mt="xl">
          <Pill.Group>{pills}</Pill.Group>
        </Center>
      </Stack>
    </>
  );
}
