import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  InputBase,
  Select,
  TextInput,
  Radio,
} from "@mantine/core";
import { IMaskInput } from "react-imask";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { DatePickerInput } from "@mantine/dates";
import type { PaperProps } from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { AuthTypeEnum } from "../types/Auth.type";
import { useState } from "react";
import { useWelcomeContext } from "../Hook/WelcomeContext";
import { useLoginForm } from "../Hook/form/UseLoginForm";
import { useRegisterForm } from "../Hook/form/UseRegisterForm";
import { RoleTypeEnum } from "../types/Role.type";
import useLogin from "../Hook/useLogin";
import useRegister from "../Hook/useRegister";

export function AuthenticationForm(props: PaperProps) {
  const { authType, setAuthType } = useWelcomeContext();
  const [userType, setUserType] = useState<"Yes" | "No">("No");
  const loginForm = useLoginForm();
  const registerForm = useRegisterForm();
  const register = useRegister();
  const login = useLogin();

  const handleChange = (value: string) => {
    setUserType(value as "Yes" | "No");

    if (value === "Yes") {
      setAuthType(AuthTypeEnum.REGISTER_DOCTOR);
      registerForm.setFieldValue("role", RoleTypeEnum.DOCTOR);
    } else {
      setAuthType(AuthTypeEnum.REGISTER_PATIENT);
      registerForm.setFieldValue("role", RoleTypeEnum.PATIENT);
    }
  };

  return (
    <Paper radius="md" p="lg" withBorder {...props}>
      <Group grow mb="md" mt="md" display={Flex} justify="center">
        <GoogleButton radius="xl" style={{ maxWidth: 150 }}>
          Google
        </GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={
          authType === AuthTypeEnum.LOGIN
            ? loginForm.onSubmit(async (values) => {
                login(values);
              })
            : registerForm.onSubmit(async (values) => {
                register(values);
              })
        }
      >
        <Stack>
          {authType !== AuthTypeEnum.LOGIN && (
            <div>
              <Radio.Group
                name="User-type"
                label="Are you a Doctor?"
                withAsterisk
                value={userType}
                onChange={handleChange}
              >
                <Group mt="xs">
                  <Radio value="Yes" label="Yes" />
                  <Radio value="No" label="No" />
                </Group>
              </Radio.Group>

              <TextInput
                mt="md"
                label="Name"
                placeholder="Your name"
                value={registerForm.values.name}
                onChange={(event) =>
                  registerForm.setFieldValue("name", event.currentTarget.value)
                }
                error={registerForm.errors.name}
                radius="md"
                withAsterisk
              />

              <TextInput
                mt="md"
                label="Surname"
                placeholder="Your Surname"
                value={registerForm.values.surname}
                onChange={(event) =>
                  registerForm.setFieldValue(
                    "surname",
                    event.currentTarget.value
                  )
                }
                error={registerForm.errors.surname}
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
                value={registerForm.values.gender}
                onChange={(value) =>
                  registerForm.setFieldValue("gender", value || "")
                }
                error={registerForm.errors.gender}
              ></Select>

              <DatePickerInput
                mt="md"
                placeholder="Pick a date"
                label="Date of Birth"
                value={registerForm.values.birthDate}
                onChange={(value) =>
                  registerForm.setFieldValue("birthDate", value || "")
                }
                error={registerForm.errors.birthDate}
                withAsterisk
              />

              <InputBase
                mt="md"
                label="Phone"
                component={IMaskInput}
                mask="+39 000 000-0000"
                placeholder="Your phone"
                value={registerForm.values.phone}
                onAccept={(value) =>
                  registerForm.setFieldValue("phone", value || "")
                }
                error={registerForm.errors.phone}
                withAsterisk
              />
              {authType != AuthTypeEnum.REGISTER_DOCTOR && (
                <TextInput
                  mt="md"
                  label="SSN"
                  placeholder="Your SSN"
                  required
                  maxLength={16}
                  value={registerForm.values.ssn}
                  onChange={(event) =>
                    registerForm.setFieldValue(
                      "ssn",
                      event.currentTarget.value.toUpperCase()
                    )
                  }
                  error={registerForm.errors.ssn}
                />
              )}
              {authType != AuthTypeEnum.REGISTER_PATIENT && (
                <TextInput
                  mt="md"
                  label="Ospedal"
                  placeholder="Your Ospedal Name"
                  required
                  value={registerForm.values.ospidal}
                  onChange={(event) =>
                    registerForm.setFieldValue(
                      "ospidal",
                      event.currentTarget.value
                    )
                  }
                />
              )}
            </div>
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@MedTrust.net"
            value={
              authType === AuthTypeEnum.LOGIN
                ? loginForm.values.email
                : registerForm.values.email
            }
            onChange={(event) => {
              if (authType == AuthTypeEnum.LOGIN) {
                loginForm.setFieldValue("email", event.currentTarget.value);
              } else {
                registerForm.setFieldValue("email", event.currentTarget.value);
              }
            }}
            error={
              authType === AuthTypeEnum.LOGIN
                ? loginForm.errors.email
                : registerForm.errors.email
            }
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={
              authType === AuthTypeEnum.LOGIN
                ? loginForm.values.password
                : registerForm.values.password
            }
            onChange={(event) => {
              if (authType == AuthTypeEnum.LOGIN) {
                loginForm.setFieldValue("password", event.currentTarget.value);
              } else {
                registerForm.setFieldValue(
                  "password",
                  event.currentTarget.value
                );
              }
            }}
            error={
              authType === AuthTypeEnum.LOGIN
                ? loginForm.errors.password
                : registerForm.errors.password
            }
            radius="md"
          />

          {authType !== AuthTypeEnum.LOGIN && (
            <div>
              <Checkbox
                readOnly
                mt="xl"
                label="I accept terms and conditions"
                checked={true}
              />
            </div>
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => {
              setAuthType(
                authType === AuthTypeEnum.LOGIN
                  ? AuthTypeEnum.REGISTER_PATIENT
                  : AuthTypeEnum.LOGIN
              );
              console.log("authtype:", authType);
            }}
            size="xs"
          >
            {authType === AuthTypeEnum.LOGIN
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Anchor>
          <Button type="submit" radius="xl">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
