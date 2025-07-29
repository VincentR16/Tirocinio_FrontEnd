import { Flex, TextInput, Select, Textarea, Checkbox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";


export default function ProcedureInfo() {
  return (
    <Flex direction="row" className={classes.container}>
      <Flex ml="lg" direction="column" className={classes.subContainer}>
        <TextInput
          mt="md"
          label="Procedure Code"
          placeholder="e.g. Appendectomy, MRI scan"
          withAsterisk
        />

        <Select
          mt="md"
          label="Status"
          placeholder="Select status"
          data={[
            "preparation",
            "in-progress",
            "completed",
            "stopped",
            "entered-in-error",
            "unknown",
          ]}
          withAsterisk
        />

        <TextInput
          mt="md"
          label="Performer"
          placeholder="Name or ID of the doctor"
        />

        <TextInput
          mt="md"
          label="Location"
          placeholder="Hospital, Clinic, or Department"
        />
      </Flex>

      <Flex direction="column" className={classes.subContainer}>
        <DatePickerInput
          mt="md"
          label="Performed Date"
          placeholder="When was it performed?"
          withAsterisk
        />

        <Textarea
          mt="md"
          label="Reason"
          placeholder="Why was the procedure performed?"
          autosize
          minRows={2}
        />

        <Textarea
          mt="md"
          label="Notes"
          placeholder="Additional notes or description"
          autosize
          minRows={2}
        />

        <Checkbox mt="md" label="Patient consented" />
      </Flex>
    </Flex>
  );
}
