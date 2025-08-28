import { Flex, TextInput, Select, Textarea } from "@mantine/core";
import classes from "../../pages/style/createEhr.module.css";
import { useEhrContext } from "../../context/EhrContext";
import { Controller } from "react-hook-form";
import { MedicationSelect } from "../MedicalSelect";
import { TermsTypeEnum } from "../../types/TermsType";

export default function ProcedureInfo() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useEhrContext();
  return (
    <Flex direction="row" className={classes.container}>
      <Flex ml="lg" direction="column" className={classes.subContainer}>

        <Controller
          control={control}
          name="procedureCode"
          render={({ field }) => (
            <MedicationSelect
              label="Procedure Code"
              termsType={TermsTypeEnum.PROCEDURE}
              placeholder="e.g. Blood draw,X-ray chest"
              value={field.value}
              onChange={field.onChange}
              onCodeChange={(code) => {
                // Imposta il codice di sistema quando viene selezionato un elemento
                setValue("procedureId", code);
              }}
              error={errors.procedureCode?.message}
            />
          )}
        />

        <Controller
          name="statusProcedure"
          control={control}
          render={({ field }) => (
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
              {...field}
              error={errors.statusProcedure?.message}
            />
          )}
        />

        <TextInput
          mt="md"
          label="Performer"
          placeholder="Name or ID of the doctor"
          {...register("performer")}
          error={errors.performer?.message}
        />
      </Flex>

      <Flex direction="column" className={classes.subContainer}>
        <Textarea
          mt="md"
          label="Reason"
          placeholder="Why was the procedure performed?"
          autosize
          minRows={2}
          maxRows={3}
          {...register("reason")}
          error={errors.reason?.message}
        />

        <Textarea
          mt="md"
          label="Notes"
          placeholder="Additional notes or description"
          autosize
          minRows={3}
          maxRows={4}
          {...register("notes")}
          error={errors.notes?.message}
        />
      </Flex>
    </Flex>
  );
}
