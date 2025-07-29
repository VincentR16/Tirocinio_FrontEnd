import { Flex, Select, TextInput, NumberInput, Textarea, Checkbox } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";


export default function ObservationInfo() {
  return (
    <Flex direction="row" className={classes.container}>
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

        <Select
          mt="md"
          label="Interpretation"
          placeholder="Clinical meaning"
          data={["Normal", "High", "Low", "Critical", "Abnormal"]}
        />
      </Flex>

      <Flex direction="column" className={classes.subContainer}>
        <DateTimePicker
          mt="md"
          label="Effective Date & Time"
          placeholder="When was it observed"
          withAsterisk
        />

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
          minRows={2}
        />

        <Checkbox
          mt="md"
          label="Based on another service (e.g. diagnostic request)"
        />

        <Checkbox mt="md" label="Part of a panel (composite observation)" />
      </Flex>
    </Flex>
  );
}
