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

export default function AllergyInfo() {
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
            minRows={1}
          />

          <DatePickerInput
            mt="md"
            label="Onset Date"
            placeholder="When did the reaction start?"
          />
        </Flex>
        <Flex direction="column" className={classes.subContainer}>
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
          <DatePickerInput
            mt="md"
            label="Recorded Date"
            placeholder="When was it recorded?"
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
