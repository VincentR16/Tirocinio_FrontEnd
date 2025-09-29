import type { Bundle, FhirResource, OperationOutcome } from "fhir/r4";
import type { Doctor } from "./Doctor.type";
import type { ComunicationType } from "./ComunicationType.enum";
import type { ComunicationStatus } from "./ComunicationStatus.enum";

export type Comunication = {
  id: string;
  createdAt: Date;
  type: ComunicationType;
  status: ComunicationStatus;
  hospital: string;
  doctor: Doctor;
  message: OperationOutcome | Bundle<FhirResource>;
};
