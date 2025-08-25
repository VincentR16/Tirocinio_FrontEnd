export const TermsTypeEnum = {
    ALLERGY:'allergy',
    OBSERVATION: 'observation',
    CONDITION: 'condition',
    PROCEDURE:  'procedure',
    MEDICATION: 'medication'
};

export type TermsType = (typeof TermsTypeEnum)[keyof typeof TermsTypeEnum];