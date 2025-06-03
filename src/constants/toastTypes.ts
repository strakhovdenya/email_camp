export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
