import type { Bundle, FhirResource, OperationOutcome } from "fhir/r4";
import type { Doctor } from "./Doctor.type";
import type { CommunicationType } from "./CommunicationType.enum";
import type { CommunicationStatus } from "./CommunicationStatus.enum";
import type { EHR } from "./Ehr.types";

export type Communication = {
  id: string;
  createdAt: Date;
  type: CommunicationType;
  status: CommunicationStatus;
  hospital: string;
  doctor: Doctor;
  ehr: EHR;
  message: OperationOutcome | Bundle<FhirResource>;
};
