import { useState, type ReactNode } from "react";
import type { EhrRequest } from "../types/EhrRequest";
import {
  EhrContext,
  type AllergyItem,
  type ObservationItem,
  type MedicationItem,
} from "./EhrContext";
import { useEhrForm } from "../hook/form/useEhrForm";
import { stepSchemas } from "../hook/form/schema/ehrSchema";
import { notifications } from "@mantine/notifications";
import z from "zod";
import type {
  Patient,
  Encounter,
  Condition,
  Procedure,
  AllergyIntolerance,
  Observation,
  MedicationRequest,
} from "fhir/r4";

export function EhrProvider({ children }: { children: ReactNode }) {
  const [ehrRequest, setEhr] = useState<EhrRequest | undefined>();
  const form = useEhrForm();
  const [active, setActive] = useState(0);

  // Stati per gli array
  const [allergies, setAllergies] = useState<AllergyItem[]>([]);
  const [observations, setObservations] = useState<ObservationItem[]>([]);
  const [medications, setMedications] = useState<MedicationItem[]>([]);

  const nextStep = () =>
    setActive((current) => (current < 7 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  // Funzioni per gestire le allergies
  const addAllergy = (allergy: AllergyItem): boolean => {
    // Validazione
    if (
      !allergy.substance?.trim() ||
      !allergy.category?.trim() ||
      !allergy.code?.trim()
    ) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "Substance, category, and code are required",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    // Controllo duplicati
    const isDuplicate = allergies.some(
      (existing) =>
        existing.substance?.toLowerCase().trim() ===
        allergy.substance?.toLowerCase().trim()
    );

    if (isDuplicate) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "There is already an allergy with the same substance",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    setAllergies((prev) => [...prev, allergy]);
    notifications.show({
      title: "Success!",
      color: "green",
      message: "Allergy added successfully",
      autoClose: 2000,
      position: "bottom-right",
    });
    return true;
  };

  const removeAllergy = (index: number) => {
    setAllergies((prev) => prev.filter((_, i) => i !== index));
  };

  const updateAllergy = (index: number, allergy: AllergyItem) => {
    setAllergies((prev) =>
      prev.map((item, i) => (i === index ? allergy : item))
    );
  };

  // Funzioni per gestire le observations
  const addObservation = (observation: ObservationItem): boolean => {
    if (
      !observation.statusObservation?.trim() ||
      !observation.categoryObservation?.trim() ||
      !observation.code?.trim()
    ) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "Status, category, and code are required",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    // Controllo duplicati basato su code + category
    const isDuplicate = observations.some(
      (existing) =>
        existing.code === observation.code &&
        existing.categoryObservation === observation.categoryObservation
    );

    if (isDuplicate) {
      notifications.show({
        title: "Error!",
        color: "red",
        message:
          "There is already an observation with the same code and category",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    setObservations((prev) => [...prev, observation]);
    notifications.show({
      title: "Success!",
      color: "green",
      message: "Observation added successfully",
      autoClose: 2000,
      position: "bottom-right",
    });
    return true;
  };

  const removeObservation = (index: number) => {
    setObservations((prev) => prev.filter((_, i) => i !== index));
  };

  const updateObservation = (index: number, observation: ObservationItem) => {
    setObservations((prev) =>
      prev.map((item, i) => (i === index ? observation : item))
    );
  };

  // Funzioni per gestire le medications
  const addMedication = (medication: MedicationItem): boolean => {
    if (
      !medication.medication?.trim() ||
      !medication.statusMedication?.trim() ||
      !medication.dosageInstructions?.trim()
    ) {
      notifications.show({
        title: "Error!",
        color: "red",
        message:
          "Medication name, status, and dosage instructions are required",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    // Validazione data di inizio
    if (
      !medication.startDate ||
      isNaN(new Date(medication.startDate).getTime())
    ) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "Valid start date is required",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    // Controllo duplicati basato sul nome del farmaco
    const isDuplicate = medications.some(
      (existing) =>
        existing.medication?.toLowerCase().trim() ===
        medication.medication?.toLowerCase().trim()
    );

    if (isDuplicate) {
      notifications.show({
        title: "Error!",
        color: "red",
        message: "There is already a medication with the same name",
        autoClose: 3500,
        position: "bottom-right",
      });
      return false;
    }

    setMedications((prev) => [...prev, medication]);
    notifications.show({
      title: "Success!",
      color: "green",
      message: "Medication added successfully",
      autoClose: 2000,
      position: "bottom-right",
    });
    return true;
  };

  const removeMedication = (index: number) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMedication = (index: number, medication: MedicationItem) => {
    setMedications((prev) =>
      prev.map((item, i) => (i === index ? medication : item))
    );
  };

  const handleNextStep = async () => {
    const values = form.getValues();

    // Per gli step degli array, aggiungiamo i dati dagli stati separati
    let dataToValidate = { ...values };

    if (active === 2) {
      // Step allergies
      dataToValidate = { ...values, allergies };
    } else if (active === 3) {
      // Step observations
      dataToValidate = { ...values, observations };
    } else if (active === 6) {
      // Step medications
      dataToValidate = { ...values, medications };
    }

    const currentSchema = stepSchemas[active];
    try {
      await currentSchema.parseAsync(dataToValidate);
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn("Validation issues:", error.issues);

        let hasFieldErrors = false;

        for (const issue of error.issues) {
          const path = issue.path.join(".");

          // Se il path è vuoto, è un errore globale (come il tuo refine)
          if (path === "") {
            // Gestisci errore globale - potresti volerlo mostrare in un posto specifico
            form.setError("root", {
              message: issue.message,
            });
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            form.setError(path as any, {
              message: issue.message,
            });
            hasFieldErrors = true;
          }
        }

        // Mostra notifica solo una volta, non per ogni errore
        notifications.show({
          title: "Validation Error",
          color: "red", // rosso è più appropriato per errori
          message: hasFieldErrors
            ? "Please check the highlighted fields"
            : "This section is optional. If you fill in any field, complete all required * fields.",
          autoClose: 4000,
          position: "bottom-right",
        });
      } else {
        // Gestisci altri tipi di errore
        console.error("Unexpected error:", error);
        notifications.show({
          title: "Error",
          color: "red",
          message: "An unexpected error occurred",
          autoClose: 4000,
          position: "bottom-right",
        });
      }
    }
  };

  // Funzione per ottenere tutti i dati del form inclusi gli array
  const getAllFormData = () => {
    const formData = form.getValues();
    return {
      ...formData,
      allergies,
      observations,
      medications,
    };
  };

  function mapFormToEhr(): EhrRequest {
    const form = getAllFormData();

    // ✅ PATIENT - Con tipo FHIR completo
    const patient: Patient = {
      resourceType: "Patient",
      id: crypto.randomUUID(),
      active: true,
      name: [
        {
          use: "official",
          family: form.surname,
          given: [form.name],
          text: `${form.name} ${form.surname}`,
        },
      ],
      gender: form.gender.toLowerCase() as
        | "male"
        | "female"
        | "other"
        | "unknown",
      birthDate: form.dateOfBirth,
      telecom: [
        ...(form.phone
          ? [
              {
                system: "phone" as const,
                value: form.phone,
                use: "mobile" as const,
              },
            ]
          : []),
        ...(form.email
          ? [
              {
                system: "email" as const,
                value: form.email,
                use: "home" as const,
              },
            ]
          : []),
      ],
      address: form.location
        ? [
            {
              use: "home",
              text: form.location,
              type: "physical",
            },
          ]
        : undefined,
      identifier: form.ssn
        ? [
            {
              use: "official",
              type: {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                    code: "SS",
                    display: "Social Security Number",
                  },
                ],
              },
              value: form.ssn,
            },
          ]
        : undefined,
    };

    // ✅ ENCOUNTER - Con tipo FHIR completo
    const encounter: Encounter = {
      resourceType: "Encounter",
      id: crypto.randomUUID(),
      status: form.statusEncounter as Encounter["status"],
      subject: { reference: `Patient/${patient.id}` },
      class: {
        system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        code: form.class,
        display: form.class,
      },
      type: form.type
        ? [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: form.type,
                  display: form.type,
                },
              ],
            },
          ]
        : undefined,
      period:
        form.start || form.end
          ? {
              start: form.start,
              end: form.end,
            }
          : undefined,
      location: form.locationEncounter
        ? [
            {
              location: {
                display: form.locationEncounter,
              },
            },
          ]
        : undefined,
      serviceProvider: form.serviceProvider
        ? {
            display: form.serviceProvider,
          }
        : undefined,
      reasonCode: form.reason
        ? [
            {
              text: form.reason,
            },
          ]
        : undefined,
    };

    // ✅ CONDITION - Con tipo FHIR completo
    const condition: Condition = {
      resourceType: "Condition",
      id: form.conditionId || crypto.randomUUID(),
      subject: { reference: `Patient/${patient.id}` },
      encounter: { reference: `Encounter/${encounter.id}` },
      clinicalStatus: form.clinicalStatus
        ? {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/condition-clinical",
                code: form.clinicalStatus,
                display: form.clinicalStatus,
              },
            ],
          }
        : undefined,
      code: form.conditionCode
        ? {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: form.conditionCode,
                display: form.conditionCode,
              },
            ],
          }
        : undefined,
      severity: form.severity
        ? {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: form.severity,
                display: form.severity,
              },
            ],
          }
        : undefined,
      category: form.category
        ? [
            {
              coding: [
                {
                  system:
                    "http://terminology.hl7.org/CodeSystem/condition-category",
                  code: form.category,
                  display: form.category,
                },
              ],
            },
          ]
        : undefined,
      bodySite: form.bodySite
        ? [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: form.bodySite,
                  display: form.bodySite,
                },
              ],
            },
          ]
        : undefined,
      note: form.note
        ? [
            {
              text: form.note,
            },
          ]
        : undefined,
    };

    // ✅ PROCEDURE - Con tipo FHIR completo
    const procedure: Procedure = {
      resourceType: "Procedure",
      id: form.procedureId || crypto.randomUUID(),
      status: form.statusProcedure ?? "unknown",
      subject: { reference: `Patient/${patient.id}` },
      encounter: { reference: `Encounter/${encounter.id}` },
      code: form.procedureCode
        ? {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: form.procedureCode,
                display: form.procedureCode,
              },
            ],
          }
        : undefined,
      performer: form.performer
        ? [
            {
              actor: {
                display: form.performer,
              },
            },
          ]
        : undefined,
      reasonCode: form.reason
        ? [
            {
              text: form.reason,
            },
          ]
        : undefined,
      note: form.notes
        ? [
            {
              text: form.notes,
            },
          ]
        : undefined,
    };

    return {
      patient,
      encounter,
      condition,
      procedure,
      allergies: mapAllergiesToFhir(form.allergies || [], patient.id!),
      observations: mapObservationsToFhir(
        form.observations || [],
        patient.id!,
        encounter.id!
      ),
      medications: mapMedicationsToFhir(
        form.medications || [],
        patient.id!,
        encounter.id!
      ),
      patientEmail: form.email,
    };
  }

  function mapMedicationsToFhir(
    items: MedicationItem[],
    patientId: string,
    encounterId: string
  ): MedicationRequest[] {
    return items.map(
      (m): MedicationRequest => ({
        resourceType: "MedicationRequest",
        id: crypto.randomUUID(),
        status:
          m.statusMedication === "intended" ? "draft" : m.statusMedication,
        intent: "order",
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `Encounter/${encounterId}` },
        medicationCodeableConcept: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: m.medicationId,
              display: m.medication,
            },
          ],
          text: m.medication,
        },
        dosageInstruction: [
          {
            text: m.dosageInstructions,
            route: m.route
              ? {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code: m.route,
                      display: m.route,
                    },
                  ],
                }
              : undefined,
            timing:
              m.startDate || m.endDate
                ? {
                    repeat: {
                      boundsPeriod: {
                        start: m.startDate,
                        end: m.endDate,
                      },
                    },
                  }
                : undefined,
          },
        ],
        reasonCode: m.reasonMedication
          ? [
              {
                text: m.reasonMedication,
              },
            ]
          : undefined,
      })
    );
  }

  function mapObservationsToFhir(
    items: ObservationItem[],
    patientId: string,
    encounterId: string
  ): Observation[] {
    return items.map(
      (o): Observation => ({
        resourceType: "Observation",
        id: crypto.randomUUID(),
        status: o.statusObservation as Observation["status"],
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `Encounter/${encounterId}` },
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: o.categoryObservation,
                display: o.categoryObservation,
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: o.codeObservation,
              display: o.code,
            },
          ],
        },
        valueQuantity: {
          value: o.value,
          unit: o.unit,
          system: "http://unitsofmeasure.org",
          code: o.unit,
        },
        performer: o.performer
          ? [
              {
                display: o.performer,
              },
            ]
          : undefined,
        note: o.comment
          ? [
              {
                text: o.comment,
              },
            ]
          : undefined,
      })
    );
  }

  function mapAllergiesToFhir(
    items: AllergyItem[],
    patientId: string
  ): AllergyIntolerance[] {
    return items.map(
      (a): AllergyIntolerance => ({
        resourceType: "AllergyIntolerance",
        id: crypto.randomUUID(),
        patient: { reference: `Patient/${patientId}` },
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
              code: "active",
              display: "Active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
              code: "confirmed",
              display: "Confirmed",
            },
          ],
        },
        type: a.typeAllergy as "allergy" | "intolerance" | undefined,
        category: a.category
          ? [a.category as "food" | "medication" | "environment" | "biologic"]
          : undefined,
        criticality: a.criticality as AllergyIntolerance["criticality"],
        code: {
          coding: a.code
            ? [
                {
                  system: "http://snomed.info/sct",
                  code: a.code,
                  display: a.substance,
                },
              ]
            : undefined,
          text: a.substance,
        },
        note: a.reactionDescription
          ? [{ text: a.reactionDescription }]
          : undefined,
        reaction: a.reactionDescription
          ? [
              {
                description: a.reactionDescription,
                manifestation: [
                  {
                    text: a.reactionDescription,
                  },
                ],
              },
            ]
          : undefined,
      })
    );
  }

  return (
    <EhrContext.Provider
      value={{
        ...form,
        ehrRequest,
        setEhr,
        handleNextStep,
        prevStep,
        nextStep,
        active,
        setActive,

        // Array management
        allergies,
        addAllergy,
        removeAllergy,
        updateAllergy,

        observations,
        addObservation,
        removeObservation,
        updateObservation,

        medications,
        addMedication,
        removeMedication,
        updateMedication,

        // Funzione per ottenere tutti i dati
        getAllFormData,
        //funzione per mappare tutti i dati
        mapFormToEhr,
      }}
    >
      {children}
    </EhrContext.Provider>
  );
}
