export const TermsTypeEnum = {
    ALLERGY:'allergy',
    OBSERVATION: 'observation',
    CONDITION: 'condition',
    PROCEDURE:  'procedure',
    MEDICATION: 'medication'
} as const;

export type TermsType = (typeof TermsTypeEnum)[keyof typeof TermsTypeEnum];