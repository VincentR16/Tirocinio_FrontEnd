import { Flex, Select, TextInput, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";
import { Controller } from "react-hook-form";
import { useEhrContext } from "../../context/EhrContext";

export default function EncounterInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useEhrContext();

  return (
    <Flex direction="row" className={classes.container}>
      <Flex ml="lg" direction="column" className={classes.subContainer}>
        <Controller
          name="statusEncounter"
          control={control}
          render={({ field }) => (
            <Select
              mt="md"
              label="Status"
              placeholder="Select status"
              data={["planned", "in-progress", "finished", "cancelled"]}
              withAsterisk
              {...field}
              error={errors.statusEncounter?.message}
            />
          )}
        />
        <Controller
          name="class"
          control={control}
          render={({ field }) => (
            <Select
              mt="md"
              label="Class"
              placeholder="Select encounter class"
              data={["inpatient", "outpatient", "ambulatory", "home"]}
              withAsterisk
              {...field}
              error={errors.class?.message}
            />
          )}
        />

        <TextInput
          mt="md"
          label="Location"
          placeholder="Clinic, hospital room, or virtual"
          withAsterisk
          {...register("locationEncounter")}
          error={errors.locationEncounter?.message}
        />
        <TextInput
          mt="md"
          label="Service Provider"
          placeholder="Ospedale di riferimento (facoltativo)"
          {...register("serviceProvider")}
          error={errors.serviceProvider?.message}
        />
      </Flex>

      <Flex direction="column" className={classes.subContainer}>
        <TextInput
          mt="md"
          label="Type"
          placeholder="e.g. Check-up, Surgery"
          withAsterisk
          {...register("type")}
          error={errors.type?.message}
        />
        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <DatePickerInput
              mt="md"
              label="Start time"
              placeholder="Start date "
              withAsterisk
              value={field.value ? new Date(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.toString().split("T")[0] : "")
              }
              error={errors.start?.message}
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <DatePickerInput
              mt="md"
              label="End time"
              placeholder="End time"
              withAsterisk
              value={field.value ? new Date(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.toString().split("T")[0] : "")
              }
              error={errors.end?.message}
            />
          )}
        />

        <Textarea
          mt="md"
          label="Reason"
          placeholder="Reason for encounter"
          autosize
          minRows={1}
          withAsterisk
          {...register("reason")}
          error={errors.reason?.message}
        />
      </Flex>
    </Flex>
  );
}
