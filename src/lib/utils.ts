import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Безопасно форматирует дату в формате 'dd.MM.yyyy HH:mm'.
 * Если дата невалидна или отсутствует — возвращает '—'.
 */
export function formatSafeDate(
  date: string | number | Date | null | undefined,
  pattern = 'dd.MM.yyyy HH:mm'
) {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';
  try {
    return format(d, pattern, { locale: ru });
  } catch {
    return '—';
  }
}
