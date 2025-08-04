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
import { Controller, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

const emptyObservation = {
  statusObservation: "",
  categoryObservation: "",
  code: "",
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
    trigger,
    formState: { errors },
  } = useEhrContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "observations",
  });

  const index = fields.length - 1;

  useEffect(() => {
    if (fields.length === 0) {
      append(emptyObservation);
    }
  }, [fields.length, append]);

  return (
    <>
      <Flex direction="row" gap="xl" className={classes.container}>
        <Flex ml="lg" direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name={`observations.${index}.statusObservation`}
            render={({ field }) => (
              <Select
                mt="md"
                label="Status"
                placeholder="Select status"
                data={["registered", "preliminary", "final", "amended"]}
                withAsterisk
                {...field}
                error={errors.observations?.[index]?.statusObservation?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={`observations.${index}.categoryObservation`}
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
                error={
                  errors.observations?.[index]?.categoryObservation?.message
                }
              />
            )}
          />

          <TextInput
            mt="md"
            label="Code"
            placeholder="e.g. Blood Pressure, Glucose"
            withAsterisk
            {...register(`observations.${index}.code`)}
            error={errors.observations?.[index]?.code?.message}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name={`observations.${index}.value`}
            render={({ field }) => (
              <NumberInput
                mt="md"
                label="Value"
                placeholder="Numerical result"
                withAsterisk
                {...field}
                error={errors.observations?.[index]?.value?.message}
              />
            )}
          />

          <TextInput
            mt="md"
            label="Unit"
            placeholder="e.g. mmHg, °C, mg/dL"
            withAsterisk
            {...register(`observations.${index}.unit`)}
            error={errors.observations?.[index]?.unit?.message}
          />

          <Controller
            control={control}
            name={`observations.${index}.effectiveDateTime`}
            render={({ field }) => (
              <DateTimePicker
                mt="md"
                label="Effective Date & Time"
                placeholder="When was it observed"
                value={field.value || null}
                onChange={field.onChange}
                error={errors.observations?.[index]?.effectiveDateTime?.message}
              />
            )}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            control={control}
            name={`observations.${index}.issuedAt`}
            render={({ field }) => (
              <DateTimePicker
                mt="md"
                label="Issued At"
                placeholder="When was it recorded"
                value={field.value || null}
                onChange={field.onChange}
                error={errors.observations?.[index]?.issuedAt?.message}
              />
            )}
          />

          <TextInput
            mt="md"
            label="Performer"
            placeholder="Doctor or device (optional)"
            {...register(`observations.${index}.performer`)}
            error={errors.observations?.[index]?.performer?.message}
          />

          <Controller
            control={control}
            name={`observations.${index}.comment`}
            render={({ field }) => (
              <Textarea
                mt="md"
                label="Comments / Notes"
                placeholder="Any relevant note or remark"
                autosize
                minRows={1}
                maxRows={3}
                {...field}
                error={errors.observations?.[index]?.comment?.message}
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
                `observations.${index}.code`,
                `observations.${index}.statusObservation`,
                `observations.${index}.categoryObservation`,
                `observations.${index}.unit`,
                `observations.${index}.value`,
              ]);
              if (valid) {
                append(emptyObservation);
              }
            }}
          >
            Add Observation
          </Button>
        </Center>
        <Center mt="xs">
          <Pill.Group>
            {fields
              .filter((item) => item.code?.trim() !== "")
              .map((item, idx) => (
                <Pill
                  key={item.id}
                  withRemoveButton
                  onRemove={() => remove(idx)}
                >
                  {item.code}
                </Pill>
              ))}
          </Pill.Group>
        </Center>
      </Stack>
    </>
  );
}
