import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  InputBase,
  Paper,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import classes from "../style/profile.module.css";
import { IMaskInput } from "react-imask";
import { useAuthContext } from "../../context/AuthContext";
import { useProfileForm } from "../../hook/form/useProfileForm";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";

export default function Profile() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { user } = useAuthContext();
  const form = useProfileForm();

  const button: string = isDisabled ? "Modify" : "Submit";

  return (
    <main>
      <Flex direction="row" justify="center" className={classes.container}>
        <Paper w="100%" shadow="xs" mt="lg" radius="md" withBorder p="lg">
          <Flex mb="xl" direction="column" align="center" w="100%">
            <Avatar
              variant="light"
              className={classes.avatar}
              radius="lg"
              color="rgb(29, 79, 217)"
              src=""
            />
            <Center pt="lg">
              <Text className={classes.roleText}>
                {user?.role?.toUpperCase()}
              </Text>
            </Center>
            <Group>
              <Text className={classes.profileName}>{user?.name}</Text>
              <Text className={classes.profileName}>{user?.surname}</Text>
            </Group>
          </Flex>
          <Flex direction="row" justify="center" gap="xl">
            <Flex mr="xl" direction="column" gap="md" w="35%">
              <TextInput
                label="Email"
                value={form.values.email}
                error={form.errors.email}
                placeholder="Input placeholder"
                disabled={isDisabled}
              />
              <Select
                comboboxProps={{ withinPortal: true }}
                data={["Male", "Female", "Other"]}
                placeholder="Pick one"
                label="Gender"
                value={form.values.gender}
                error={form.errors.gender}
                disabled={isDisabled}
              ></Select>
              <DatePickerInput
                placeholder="Pick a date"
                label="Date of Birth"
                value={form.values.birthDate}
                error={form.errors.birthDate}
                disabled={isDisabled}
              />
            </Flex>
            <Divider orientation="vertical" />
            <Flex ml="xl" direction="column" gap="md" w="35%">
              <TextInput
                label="Password"
                value={form.values.email}
                placeholder="Input placeholder"
                disabled={isDisabled}
              />
              <TextInput
                label="to implement ssn or ospidal" //todo 
                placeholder="Your SSN"
                disabled={isDisabled}
                maxLength={16}
                error={form.errors.ssn}
              />
              <InputBase
                label="Phone"
                component={IMaskInput}
                mask="+39 000 000-0000"
                placeholder="Your phone"
                value={form.values.phone}
                error={form.errors.phone}
                disabled={isDisabled}
              />
            </Flex>
          </Flex>
          <Center mt="xl">
            <Button
              color="rgb(29, 79, 217)"
              onClick={() => {
                setIsDisabled(!isDisabled);
              }}
            >
              {button}
            </Button>
          </Center>
        </Paper>
      </Flex>
    </main>
  );
}
