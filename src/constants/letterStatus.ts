export const LETTER_STATUSES = ['pending', 'delivered'] as const;
export type LetterStatus = (typeof LETTER_STATUSES)[number];
export const LETTER_STATUS_FILTERS = ['all', ...LETTER_STATUSES] as const;
export type LetterStatusFilter = (typeof LETTER_STATUS_FILTERS)[number];
