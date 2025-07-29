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
import classes from "./style/profile.module.css";
import { IMaskInput } from "react-imask";
import { useAuthContext } from "../context/AuthContext";
import { useProfileForm } from "../hook/form/useProfileForm";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { RoleTypeEnum } from "../types/Role.type";
import { notifications } from "@mantine/notifications";
import useUpdateUser from "../hook/useUpdateUser";

export default function Profile() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { user } = useAuthContext();
  const form = useProfileForm();
  const update = useUpdateUser();

  return (
    <>
      <Flex direction="row" justify="center" className={classes.container}>
        <Paper
          className={classes.paper}
          w="100%"
          shadow="md"
          mt="lg"
          radius="md"
          withBorder
          p="lg"
        >
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
          <form
            onSubmit={form.onSubmit((values) => {
              update.mutate(values, {
                onSuccess: () => {
                  setIsDisabled(true);
                  notifications.show({
                    mt: "md",
                    position: "top-right",
                    title: "Success",
                    message: "Your profile has been updated",
                    autoClose: 3500,
                    color: "green",
                    style: {
                      borderColor: "rgb(55, 177, 77)",
                      borderWidth: 0.5,
                      borderStyle: "solid",
                    },
                  });
                },
              });
            })}
          >
            <Flex direction="row" justify="center" gap="xl">
              <Flex mr="xl" direction="column" gap="md" w="35%">
                <TextInput
                  label="Email"
                  value={form.values.email}
                  error={form.errors.email}
                  placeholder="Input placeholder"
                  disabled={isDisabled}
                  {...form.getInputProps("email")}
                />
                <Select
                  comboboxProps={{ withinPortal: true }}
                  data={["Male", "Female", "Other"]}
                  placeholder="Pick one"
                  label="Gender"
                  value={form.values.gender}
                  error={form.errors.gender}
                  disabled={isDisabled}
                  {...form.getInputProps("gender")}
                ></Select>
                <DatePickerInput
                  placeholder="Pick a date"
                  label="Date of Birth"
                  value={form.values.birthDate}
                  error={form.errors.birthDate}
                  disabled={isDisabled}
                  {...form.getInputProps("birthDate")}
                />
              </Flex>
              <Divider orientation="vertical" />
              <Flex ml="xl" direction="column" gap="md" w="35%">
                <TextInput
                  label="Location"
                  value={form.values.location}
                  error={form.errors.location}
                  disabled={isDisabled}
                  {...form.getInputProps("location")}
                />
                {user?.role != RoleTypeEnum.DOCTOR && (
                  <TextInput
                    label="SSN"
                    placeholder="Your SSN"
                    maxLength={16}
                    value={form.values.ssn}
                    disabled={isDisabled}
                    error={form.errors.ssn}
                    {...form.getInputProps("ssn")}
                  />
                )}
                {user?.role != RoleTypeEnum.PATIENT && (
                  <TextInput
                    label="Ospidal"
                    placeholder="Your Ospedal Name"
                    disabled={isDisabled}
                    value={form.values.ospidal}
                    {...form.getInputProps("ospidal")}
                  />
                )}
                <InputBase
                  label="Phone"
                  component={IMaskInput}
                  mask="+39 000 000-0000"
                  placeholder="Your phone"
                  value={form.values.phone}
                  error={form.errors.phone}
                  disabled={isDisabled}
                  {...form.getInputProps("phone")}
                />
              </Flex>
            </Flex>
            <Center mt="xl">
              {isDisabled ? (
                <Button
                  color="rgb(29, 79, 217)"
                  onClick={() => setIsDisabled(false)}
                >
                  Modify
                </Button>
              ) : (
                <Group>
                  <Button
                    w="6rem"
                    variant="outline"
                    color="red"
                    onClick={() => {
                      form.reset();
                      setIsDisabled(true);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button w="6rem" color="green" type="submit">
                    Save
                  </Button>
                </Group>
              )}
            </Center>
          </form>
        </Paper>
      </Flex>
    </>
  );
}
