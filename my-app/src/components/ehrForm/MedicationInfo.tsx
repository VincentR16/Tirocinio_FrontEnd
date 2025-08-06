import {
  Flex,
  TextInput,
  Select,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import { Controller } from "react-hook-form";

export default function MedicationInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useEhrContext();
  return (
    <>
      <Flex direction="row" className={classes.container}>
        <Flex ml="lg" direction="column" className={classes.subContainer}>
          <TextInput
            mt="md"
            label="Medication"
            placeholder="e.g. Ibuprofen 200mg"
            withAsterisk
            {...register("medication")}
            error={errors.medication?.message}
          />

          <Controller
            name="statusMedication"
            control={control}
            render={({ field }) => (
              <Select
                mt="md"
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
                  "not-taken",
                ]}
                withAsterisk
                {...field}
                error={errors.statusMedication?.message}
              />
            )}
          />

          <Textarea
            mt="md"
            label="Dosage Instructions"
            placeholder="e.g. Take 1 tablet twice daily after meals"
            autosize
            minRows={4}
            withAsterisk
            {...register("dosageInstructions")}
            error={errors.dosageInstructions?.message}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <Controller
            name="route"
            control={control}
            render={({ field }) => (
              <Select
                mt="md"
                label="Route of Administration"
                placeholder="Select route"
                data={[
                  "oral",
                  "intravenous",
                  "topical",
                  "subcutaneous",
                  "inhalation",
                ]}
                {...field}
                error={errors.route?.message}
              />
            )}
          />

          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                mt="md"
                label="Start Date"
                placeholder="When did the medication start?"
                withAsterisk
                value={field.value ? new Date(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? date.toString().split("T")[0] : "")
                }
                error={errors.startDate?.message}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                mt="md"
                label="End Date"
                placeholder="When did it stop? (optional)"
                value={field.value ? new Date(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? date.toString().split("T")[0] : "")
                }
                error={errors.endDate?.message}
              />
            )}
          />

          <TextInput
            mt="md"
            label="Reason"
            placeholder="Reason for taking the medication"
            {...register("reasonMedication")}
            error={errors.reasonMedication?.message}
          />
        </Flex>
      </Flex>
    </>
  );
}
