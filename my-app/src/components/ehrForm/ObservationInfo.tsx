import { Flex, Select, TextInput, NumberInput, Textarea, Stack, Center, Button, Pill } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";

export default function ObservationInfo() {
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
          <Select
            mt="md"
            label="Status"
            placeholder="Select status"
            data={["registered", "preliminary", "final", "amended"]}
            withAsterisk
          />
          <Select
            mt="md"
            label="Category"
            placeholder="Select category"
            data={["vital-signs", "laboratory", "social-history", "imaging"]}
            withAsterisk
          />
          <TextInput
            mt="md"
            label="Code"
            placeholder="e.g. Blood Pressure, Glucose"
            withAsterisk
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <NumberInput
            mt="md"
            label="Value"
            placeholder="Numerical result"
            withAsterisk
          />

          <TextInput
            mt="md"
            label="Unit"
            placeholder="e.g. mmHg, °C, mg/dL"
            withAsterisk
          />
          <DateTimePicker
            mt="md"
            label="Effective Date & Time"
            placeholder="When was it observed"
            withAsterisk
          />
        </Flex>
        <Flex direction="column" className={classes.subContainer}>
          <DateTimePicker
            mt="md"
            label="Issued At"
            placeholder="When was it recorded"
          />

          <TextInput
            mt="md"
            label="Performer"
            placeholder="Doctor or device (optional)"
          />
          <Textarea
            mt="md"
            label="Comments / Notes"
            placeholder="Any relevant note or remark"
            autosize
            minRows={1}
            maxRows={3}
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
