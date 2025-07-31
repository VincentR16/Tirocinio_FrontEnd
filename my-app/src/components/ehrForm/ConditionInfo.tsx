import { Flex, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import { Controller } from "react-hook-form";

export default function ConditionInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useEhrContext();
  return (
    <Flex direction="row" className={classes.container}>
      <Flex ml="lg" direction="column" className={classes.subContainer}>
        <TextInput
          mt="md"
          label="Condition Code"
          placeholder="e.g. Hypertension, Diabetes"
          withAsterisk
          {...register("conditionCode")}
          error={errors.conditionCode?.message}
        />

        <Controller
          control={control}
          name="clinicalStatus"
          render={({ field }) => (
            <Select
              mt="md"
              label="Clinical Status"
              placeholder="Select status"
              data={["active", "recurrence", "relapse", "inactive", "resolved"]}
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
              placeholder="Verification level"
              data={["confirmed", "unconfirmed", "provisional", "differential"]}
              {...field}
              error={errors.verificationStatus?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="severity"
          render={({ field }) => (
            <Select
              mt="md"
              label="Severity"
              placeholder="How severe is the condition?"
              data={["mild", "moderate", "severe"]}
              {...field}
              error={errors.severity?.message}
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
              placeholder="e.g. Problem-list-item, Encounter-diagnosis"
              data={["problem-list-item", "encounter-diagnosis"]}
              {...field}
              error={errors.category?.message}
            />
          )}
        />
      </Flex>

      <Flex direction="column" className={classes.subContainer}>
        <Controller
          control={control}
          name="onsetDate"
          render={({ field }) => (
            <DatePickerInput
              mt="md"
              label="Onset Date"
              placeholder="When did it start?"
              withAsterisk
              value={field.value || null}
              onChange={field.onChange}
              error={errors.onsetDate?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="abatementDate"
          render={({ field }) => (
            <DatePickerInput
              mt="md"
              label="Abatement Date"
              placeholder="When did it resolve?"
              value={field.value || null}
              onChange={field.onChange}
              error={errors.abatementDate?.message}
            />
          )}
        />

        <TextInput
          mt="md"
          label="Body Site"
          placeholder="Where is the condition located?"
          {...register("bodySite")}
          error={errors.bodySite?.message}
        />

        <TextInput
          mt="md"
          label="Recorder"
          placeholder="Who recorded this condition?"
          {...register("recorder")}
          error={errors.recorder?.message}
        />

        <Controller
          control={control}
          name="note"
          render={({ field }) => (
            <Textarea
              mt="md"
              label="Note"
              placeholder="Clinical notes, context or history"
              autosize
              minRows={1}
              maxRows={2}
              {...field}
              error={errors.note?.message}
            />
          )}
        />
      </Flex>
    </Flex>
  );
}
