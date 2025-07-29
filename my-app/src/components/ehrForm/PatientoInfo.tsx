import { Flex, TextInput, Select, InputBase } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IMaskInput } from "react-imask";
import classes from "../../pages/style/createEhr.module.css";

export default function PatientInfo() {
  return (
    <Flex direction="row" className={classes.container}>
      <Flex ml="lg" direction="column" className={classes.subContainer}>
        <TextInput
          mt="md"
          label="Name"
          placeholder="Patient name"
          value=""
          radius="md"
          withAsterisk
        />

        <Select
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={["Male", "Female", "Other"]}
          placeholder="Pick one"
          label="Gender"
          withAsterisk
        ></Select>

        <TextInput
          mt="md"
          label="Location"
          placeholder="Patient Location"
          withAsterisk
        />
        <TextInput
          mt="md"
          required
          label="Email"
          placeholder="Patientemail@MedTrust.net"
        />
      </Flex>

      <Flex direction="column" className={classes.subContainer}>
        <TextInput
          mt="md"
          label="Surname"
          placeholder="Patient Surname"
          radius="md"
          withAsterisk
        />

        <DatePickerInput
          mt="md"
          placeholder="Pick a date"
          label="Date of Birth"
          withAsterisk
        />

        <TextInput
          mt="md"
          label="SSN"
          placeholder="Patient SSN"
          required
          maxLength={16}
        />
        <InputBase
          mt="md"
          label="Phone"
          component={IMaskInput}
          required
          mask="+39 000 000-0000"
          placeholder="Patient phone"
        />
      </Flex>
    </Flex>
  );
}
