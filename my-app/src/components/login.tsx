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
import { useForm } from "@mantine/form";
import { GoogleButton } from "./GoogleButton";
import type { AuthType } from "../types/Auth.types";
import { AuthTypeEnum } from "../types/Auth.types";
import { useState } from "react";

export function AuthenticationForm(props: PaperProps) {
  const [authType, setAuthType] = useState<AuthType>(AuthTypeEnum.LOGIN);

  const [userType, setUserType] = useState<"Yes" | "No">("No");

  const handleChange = (value: string) => {
    setUserType(value as "Yes" | "No");

    if (value === "Yes") {
      setAuthType(AuthTypeEnum.REGISTER_DOCTOR);
    } else {
      setAuthType(AuthTypeEnum.REGISTER_PATIENT);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      password: "",
      codiceFiscale: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      codiceFiscale: (value) =>
        /^[A-Z0-9]{16}$/.test(value) ? null : "Codice fiscale non valido",
    },
  });
  return (
    <Paper radius="md" p="lg" withBorder {...props}>
      <Group grow mb="md" mt="md" display={Flex} justify="center">
        <GoogleButton radius="xl" style={{ maxWidth: 150 }}>
          Google
        </GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
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
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
                withAsterisk
              />

              <TextInput
                mt="md"
                label="Surname"
                placeholder="Your Surname"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("surname", event.currentTarget.value)
                }
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

              <DatePickerInput
                mt="md"
                placeholder="Pick a date"
                label="Date of Birth"
                withAsterisk
              />

              <InputBase
                mt="md"
                label="Phone"
                component={IMaskInput}
                mask="+00 000 000-0000"
                placeholder="Your phone"
                withAsterisk
              />
              {authType != AuthTypeEnum.REGISTER_DOCTOR && (
                <TextInput
                  mt="md"
                  label="SSN"
                  placeholder="Your SSN"
                  required
                  maxLength={16}
                  value={form.values.codiceFiscale}
                  onChange={(event) =>
                    form.setFieldValue(
                      "codiceFiscale",
                      event.currentTarget.value.toUpperCase()
                    )
                  }
                  error={form.errors.codiceFiscale}
                />
              )}
              {authType != AuthTypeEnum.REGISTER_PATIENT && (
                <TextInput
                  mt="md"
                  label="Ospedal"
                  placeholder="Your Ospedal Name"
                  required
                />
              )}
            </div>
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />

          {authType !== AuthTypeEnum.LOGIN && (
            <div>
              <Checkbox
                mt="xl"
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            </div>
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() =>
              setAuthType(
                authType === AuthTypeEnum.LOGIN
                  ? AuthTypeEnum.REGISTER_PATIENT
                  : AuthTypeEnum.LOGIN
              )
            }
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
