import { Flex, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";

export default function ConditionInfo() {
  return (
    <Flex direction="row" className={classes.container}>
      <Flex ml="lg" direction="column" className={classes.subContainer}>
        <TextInput
          mt="md"
          label="Condition Code"
          placeholder="e.g. Hypertension, Diabetes"
          withAsterisk
        />

        <Select
          mt="md"
          label="Clinical Status"
          placeholder="Select status"
          data={["active", "recurrence", "relapse", "inactive", "resolved"]}
          withAsterisk
        />

        <Select
          mt="md"
          label="Verification Status"
          placeholder="Verification level"
          data={["confirmed", "unconfirmed", "provisional", "differential"]}
        />

        <Select
          mt="md"
          label="Severity"
          placeholder="How severe is the condition?"
          data={["mild", "moderate", "severe"]}
        />

        <Select
          mt="md"
          label="Category"
          placeholder="e.g. Problem-list-item, Encounter-diagnosis"
          data={["problem-list-item", "encounter-diagnosis"]}
        />
      </Flex>

      <Flex direction="column" className={classes.subContainer}>
        <DatePickerInput
          mt="md"
          label="Onset Date"
          placeholder="When did it start?"
          withAsterisk
        />

        <DatePickerInput
          mt="md"
          label="Abatement Date"
          placeholder="When did it resolve?"
        />

        <TextInput
          mt="md"
          label="Body Site"
          placeholder="Where is the condition located?"
        />

        <TextInput
          mt="md"
          label="Recorder"
          placeholder="Who recorded this condition?"
        />
        <Textarea
          mt="md"
          label="Note"
          placeholder="Clinical notes, context or history"
          autosize
          minRows={1}
          maxRows={2}
        />
      </Flex>
    </Flex>
  );
}
