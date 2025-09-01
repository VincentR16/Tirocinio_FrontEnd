import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Paper,
  Stack,
  Stepper,
  Tooltip,
  Group,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
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
import { useEhrContext } from "../context/EhrContext";
import { notifications } from "@mantine/notifications";
import useCreateEhr from "../hook/useCreateEhr";
import type { EhrRequest } from "../types/EhrRequest";
export default function CreateEhr() {
  const navigate = useNavigate();
  const { active, setActive, prevStep, handleNextStep, mapFormToEhr } =
    useEhrContext();
  const createEhr = useCreateEhr();

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
              description={active === 2 ? "Patient's allergy (Optional)" : ""}
            >
              <AllergyInfo />
            </Stepper.Step>
            <Stepper.Step
              icon={<Eye />}
              label={active === 3 ? "Observation" : ""}
              description={
                active === 3 ? "Describe the patient observation " : ""
              }
            >
              <ObservationInfo />
            </Stepper.Step>
            <Stepper.Step
              icon={<HeartPulse />}
              label={active === 4 ? "Condition" : ""}
              description={active === 4 ? "dipict the patient's condition" : ""}
            >
              <ConditionInfo />
            </Stepper.Step>
            <Stepper.Step
              icon={<Syringe />}
              label={active === 5 ? "Procedure" : ""}
              description={
                active === 5 ? "Explain the procedure (Optional)" : ""
              }
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
                  Form completed, click save to confirm and add the EHR
                </Center>
              </Stack>
            </Stepper.Completed>
          </Stepper>
        </Flex>
        <Center>
          <Group>
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}

            {active === 7 ? (
              <Button
                onClick={() => {
                  const ehr: EhrRequest = mapFormToEhr();
                  createEhr.mutate(ehr);
                }}
                color="green"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  {
                    try {
                      await handleNextStep();
                    } catch (err) {
                      notifications.show({
                        title: "Warning!",
                        color: "yellow",
                        message: "" + err,
                        autoClose: 3500,
                        position: "bottom-right",
                      });
                    }
                  }
                }}
              >
                Next step
              </Button>
            )}
          </Group>
        </Center>
      </Paper>
    </>
  );
}
