import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Group,
  Paper,
  Stack,
  Stepper,
  Tooltip,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Stethoscope,
  Biohazard,
  Eye,
  HeartPulse,
  Syringe,
  Pill,
  Check,
} from "lucide-react";
import PatientInfo from "../components/ehrForm/PatientoInfo";
import EncounterInfo from "../components/ehrForm/EncounterInfo";
import AllergyInfo from "../components/ehrForm/AllergyInfo";
import ObservationInfo from "../components/ehrForm/ObservationInfo";
import ConditionInfo from "../components/ehrForm/ConditionInfo";
import ProcedureInfo from "../components/ehrForm/ProcedureInfo";
import MedicationInfo from "../components/ehrForm/MedicationInfo";
import classes from "./style/createEhr.module.css";

export default function CreateEhr() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 7 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Tooltip label="Go back">
        <ActionIcon
          className={classes.arrow}
          size="lg"
          variant="subtle"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
      </Tooltip>

      <Paper p="xl" radius="md" shadow="sm" className={classes.paperContainer}>
        <form>
          <Flex direction="column" className={classes.formContainer}>
            <Stepper
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}
              completedIcon={<IconCircleCheck />}
            >
              <Stepper.Step
                icon={<User></User>}
                label={active === 0 ? "Patient" : ""}
                description={active === 0 ? "Create a Patient" : ""}
              >
                <PatientInfo />
              </Stepper.Step>
              <Stepper.Step
                icon={<Stethoscope></Stethoscope>}
                label={active === 1 ? "Encounter" : ""}
                description={active === 1 ? "Describe the encounter" : ""}
              >
                <EncounterInfo />
              </Stepper.Step>
              <Stepper.Step
                icon={<Biohazard></Biohazard>}
                label={active === 2 ? "Allergy" : ""}
                description={active === 2 ? "Patient's allergy" : ""}
              >
                <AllergyInfo />
              </Stepper.Step>
              <Stepper.Step
                icon={<Eye />}
                label={active === 3 ? "Observation" : ""}
                description={
                  active === 3 ? "Describe the patient observation" : ""
                }
              >
                <ObservationInfo />
              </Stepper.Step>
              <Stepper.Step
                icon={<HeartPulse />}
                label={active === 4 ? "Condition" : ""}
                description={
                  active === 4 ? "dipict the patient's condition" : ""
                }
              >
                <ConditionInfo />
              </Stepper.Step>
              <Stepper.Step
                icon={<Syringe />}
                label={active === 5 ? "Procedure" : ""}
                description={active === 5 ? "Explain the procedure" : ""}
              >
                <ProcedureInfo />
              </Stepper.Step>
              <Stepper.Step
                icon={<Pill />}
                label={active === 6 ? "Medication" : ""}
                description={active === 6 ? "Describe the medication" : ""}
              >
                <MedicationInfo />
              </Stepper.Step>
              <Stepper.Completed>
                <Stack p="xl" mt="xl">
                  <Center mt="xl">
                    <Check size={80} color="#228be6" />
                  </Center>
                  <Center mt="xs">
                    Form finisched, click complete to confirm and add the EHR
                  </Center>
                </Stack>
              </Stepper.Completed>
            </Stepper>
          </Flex>
          <Center>
            <Group justify="center">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Next step</Button>
            </Group>
          </Center>
        </form>
      </Paper>
    </>
  );
}
