export const ComunicationStatusEnum = {

  PENDING : 'Pending',
  RECEIVED  :'Received',
  DELIVERED : 'Delivered',
  CANCELLED : 'Cancelled',
  FAILED : 'Failed',
} as const;

export type ComunicationStatus = (typeof ComunicationStatusEnum)[keyof typeof ComunicationStatusEnum]