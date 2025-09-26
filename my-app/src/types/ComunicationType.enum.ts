export const ComunicationTypeEnum = {
  OUTGOING:"Outgoing",
  INCOMING: "Incoming",
} as const;

export type ComunicationType =  (typeof ComunicationTypeEnum)[keyof typeof ComunicationTypeEnum]
