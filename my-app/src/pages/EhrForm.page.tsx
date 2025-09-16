import {
  Button,
  Center,
  Flex,
  Paper,
  Stack,
  Stepper,
  Group,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

import {
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
import useCreateEhr from "../hook/useCreateEhr";
import type { EhrRequest } from "../types/EhrRequest";
import { useLocation } from "react-router-dom";
import type { EHR } from "../types/Ehr.types";

//todo cercare un modo per rendere questo form di creazione anche un form di modifica, usare il context per passarsi le informazioni?
//todo altrimenti estendere il context anche alla home page per passare eher , ehr viene passato a priori ad ogni step
//todo da cui prendiamo le informazioni per poi poterle inserire come value.
//todo aggiungere un modal che se si cerca di cambiare page esca con la scritta i tuoi progressi verranno persi o qulcs del genere
//todo cambiare il tasto alla fine che se è nello stato di edit vada a chiamare l api corretta

//! per il momento lascio stare semplicemente perche non mi viene in mente un modo semplice e coinciso per fare cio
//! utilizzare lo stesso form della creazioni crea molti problemi, il form poi rimane compilato lo dovrei pure svuotare
//! o si fa un form a parte solo per l edit oppure non do la possibilita di modificare tutto ma solo alcuni campi (es solo i dati del paziente) 
//! oppure si trova un modo per poter fare tutto in modo coinciso , cosa che non penso che sriesca a fare

//? non fare questa parte non comporterebbe niente di che ma di certo in linea di massima è una features che solitamente dovrebbe essere presente in questi tipi di siti?
//? non lo so

// non non è vero il form non mi rimane compilato ma si svuota da solo una volta uscito dalla pagina

export default function EhrForm() {
  const { active, setActive, prevStep, handleNextStep, mapFormToEhr,setEhr} =
    useEhrContext();
  const createEhr = useCreateEhr();
  const location = useLocation();
  const ehr: EHR | undefined = location.state?.ehr || undefined;
  setEhr(ehr)

  return (
    <>
      <Paper
        p="xl"
        mt="xl"
        radius="md"
        shadow="sm"
        className={classes.paperContainer}
      >
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
              description={active === 0 ? "Create a Patient (Required)" : ""}
            >
              <PatientInfo />
            </Stepper.Step>
            <Stepper.Step
              icon={<Stethoscope></Stethoscope>}
              label={active === 1 ? "Encounter" : ""}
              description={
                active === 1 ? "Describe the encounter (Required)" : ""
              }
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
                    await handleNextStep();
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
