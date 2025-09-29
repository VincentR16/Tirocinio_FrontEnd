export const CommunicationTypeEnum = {
  OUTGOING:"Outgoing",
  INCOMING: "Incoming",
} as const;

export type CommunicationType =  (typeof CommunicationTypeEnum)[keyof typeof CommunicationTypeEnum]
