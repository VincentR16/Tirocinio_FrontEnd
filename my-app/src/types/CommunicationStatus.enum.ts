export const CommunicationStatusEnum = {

  PENDING : 'Pending',
  RECEIVED  :'Received',
  DELIVERED : 'Delivered',
  CANCELLED : 'Cancelled',
  FAILED : 'Failed',
} as const;

export type CommunicationStatus = (typeof CommunicationStatusEnum)[keyof typeof CommunicationStatusEnum]