import { Flex, TextInput, Select, Textarea, Checkbox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";

export default function AllergyInfo() {
  return (
    <Flex direction="row" className={classes.container}>
      <Flex ml="lg" direction="column" className={classes.subContainer}>
        <TextInput
          mt="md"
          label="Substance"
          placeholder="e.g. Penicillin, Peanuts"
          withAsterisk
        />

        <Select
          mt="md"
          label="Clinical Status"
          placeholder="Status"
          data={["active", "inactive", "resolved"]}
          withAsterisk
        />

        <Select
          mt="md"
          label="Verification Status"
          placeholder="Verification"
          data={["unconfirmed", "confirmed", "refuted", "entered-in-error"]}
          withAsterisk
        />

        <Select
          mt="md"
          label="Type"
          placeholder="Select type"
          data={["allergy", "intolerance"]}
        />

        <Select
          mt="md"
          label="Category"
          placeholder="Category"
          data={["food", "medication", "environment", "biologic"]}
        />
      </Flex>

      <Flex direction="column" className={classes.subContainer}>
        <Select
          mt="md"
          label="Criticality"
          placeholder="Severity level"
          data={["low", "high", "unable-to-assess"]}
        />

        <Textarea
          mt="md"
          label="Reaction Description"
          placeholder="e.g. Rash, Anaphylaxis"
          autosize
          minRows={2}
        />

        <DatePickerInput
          mt="md"
          label="Onset Date"
          placeholder="When did the reaction start?"
        />

        <DatePickerInput
          mt="md"
          label="Recorded Date"
          placeholder="When was it recorded?"
        />

        <TextInput
          mt="md"
          label="Recorder"
          placeholder="Who recorded this allergy?"
        />

        <Checkbox mt="md" label="Patient self-reported" />
      </Flex>
    </Flex>
  );
}
