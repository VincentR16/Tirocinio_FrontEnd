import { Flex, Select, TextInput, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";

export default function EncounterInfo() {
  return (
    <Flex direction="row" className={classes.container}>
      <Flex ml="lg" direction="column" className={classes.subContainer}>
        <Select
          mt="md"
          label="Status"
          placeholder="Select status"
          data={["planned", "in-progress", "finished", "cancelled"]}
          withAsterisk
        />
        <Select
          mt="md"
          label="Class"
          placeholder="Select encounter class"
          data={["inpatient", "outpatient", "ambulatory", "home"]}
          withAsterisk
        />
        <TextInput
          mt="md"
          label="Location"
          placeholder="Clinic, hospital room, or virtual"
          withAsterisk
        />
        <TextInput
          mt="md"
          label="Service Provider"
          placeholder="Ospedale di riferimento (facoltativo)"
        />
      </Flex>

      <Flex direction="column" className={classes.subContainer}>
        <TextInput
          mt="md"
          label="Type"
          placeholder="e.g. Check-up, Surgery"
          withAsterisk
        />
        <Textarea
          mt="md"
          label="Reason"
          placeholder="Reason for encounter"
          autosize
          minRows={2}
          withAsterisk
        />
        <DateTimePicker
          mt="md"
          label="Start time"
          placeholder="Start date and time"
          withAsterisk
        />
        <DateTimePicker
          mt="md"
          label="End time"
          placeholder="End date and time"
        />
      </Flex>
    </Flex>
  );
}
