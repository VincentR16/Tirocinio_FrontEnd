import { Flex, TextInput, Select, Textarea, Checkbox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../../pages/style/createEhr.module.css";


export default function MedicationInfo(){
    return (
        <Flex direction="row" className={classes.container}>
                <Flex
                  ml="lg"
                  direction="column"
                  className={classes.subContainer}
                >
                  <TextInput
                    mt="md"
                    label="Medication"
                    placeholder="e.g. Ibuprofen 200mg"
                    withAsterisk
                  />

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
                  />

                  <Textarea
                    mt="md"
                    label="Dosage Instructions"
                    placeholder="e.g. Take 1 tablet twice daily after meals"
                    autosize
                    minRows={2}
                    withAsterisk
                  />

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
                  />
                </Flex>

                <Flex direction="column" className={classes.subContainer}>
                  <DatePickerInput
                    mt="md"
                    label="Start Date"
                    placeholder="When did the medication start?"
                    withAsterisk
                  />

                  <DatePickerInput
                    mt="md"
                    label="End Date"
                    placeholder="When did it stop? (optional)"
                  />

                  <TextInput
                    mt="md"
                    label="Reason"
                    placeholder="Reason for taking the medication"
                  />

                  <Checkbox mt="md" label="Self-reported by patient" />
                </Flex>
              </Flex>
    )
}