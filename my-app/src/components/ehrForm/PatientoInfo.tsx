import {
  Flex,
  TextInput,
  Select,
  InputBase,
  Center,
  Button,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IMaskInput } from "react-imask";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import { Controller } from "react-hook-form";

export default function PatientInfo() {
  const {
    register,
    control,
    formState: { errors },
    handleNextStep,

  } = useEhrContext();
  return (
    <>
      <Flex direction="row" className={classes.container}>
        <Flex ml="lg" direction="column" className={classes.subContainer}>
          <TextInput
            mt="md"
            label="Name"
            placeholder="Patient name"
            radius="md"
            {...register("name")}
            error={errors.name?.message}
            withAsterisk
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                mt="md"
                data={["Male", "Female", "Other"]}
                placeholder="Pick one"
                label="Gender"
                withAsterisk
                {...field} // include: value, onChange, onBlur
                error={errors.gender?.message}
              />
            )}
          />

          <TextInput
            mt="md"
            label="Location"
            placeholder="Patient Location"
            {...register("location")}
            error={errors.location?.message}
          />
          <TextInput
            mt="md"
            required
            label="Email"
            placeholder="Patientemail@MedTrust.net"
            {...register("email")}
            error={errors.email?.message}
          />
        </Flex>

        <Flex direction="column" className={classes.subContainer}>
          <TextInput
            mt="md"
            label="Surname"
            placeholder="Patient Surname"
            radius="md"
            withAsterisk
            {...register("surname")}
            error={errors.surname?.message}
          />

          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                mt="md"
                placeholder="Pick a date"
                label="Date of Birth"
                withAsterisk
                value={field.value ? new Date(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? date.toString().split("T")[0] : "")
                }
                error={errors.dateOfBirth?.message}
              />
            )}
          />

          <TextInput
            mt="md"
            label="SSN"
            placeholder="Patient SSN"
            required
            maxLength={16}
            {...register("ssn")}
            error={errors.ssn?.message}
          />
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <InputBase
                mt="md"
                label="Phone"
                required
                component={IMaskInput}
                mask="+39 000 000-0000"
                placeholder="Patient phone"
                value={value ?? ""} // evita undefined
                onAccept={(val: string) => onChange(val)} // importante!
                onBlur={onBlur}
                inputRef={ref}
                error={errors.phone?.message}
              />
            )}
          />
        </Flex>
      </Flex>
      <Center>
        <Button onClick={handleNextStep}>Next step</Button>
      </Center>
    </>
  );
}
