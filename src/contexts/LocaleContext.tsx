'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import enTranslations from '@/locales/en.json';
import ruTranslations from '@/locales/ru.json';

export type Locale = 'ru' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

interface LocaleProviderProps {
  children: React.ReactNode;
}

// Тип для переводов (JSON структура может быть любой)
type TranslationValue =
  | string
  | number
  | boolean
  | TranslationValue[]
  | { [key: string]: TranslationValue };
type Translations = Record<string, TranslationValue>;

// Используем статический импорт для переводов
const translationsMap: Record<Locale, Translations> = {
  en: enTranslations as Translations,
  ru: ruTranslations as Translations,
};

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('ru');
  const [translations, setTranslations] = useState<Translations>(ruTranslations as Translations);

  useEffect(() => {
    // Обновляем переводы при изменении языка
    setTranslations(translationsMap[locale]);
  }, [locale]);

  const t = useCallback(
    (key: string): string => {
      if (!translations || Object.keys(translations).length === 0) {
        console.warn(`Translations not loaded for locale "${locale}"`);
        return key;
      }

      const keys = key.split('.');
      let value: TranslationValue = translations;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];

        if (value === null || value === undefined) {
          console.warn(
            `Translation key "${key}" not found for locale "${locale}" at "${k}" (value is null/undefined)`
          );
          return key;
        }

        if (typeof value === 'object' && value !== null) {
          // Проверяем, является ли k числовым индексом массива
          const numKey = parseInt(k, 10);
          const isNumericKey = !isNaN(numKey) && String(numKey) === k && numKey >= 0;

          if (isNumericKey && Array.isArray(value)) {
            // Доступ к элементу массива по числовому индексу
            if (numKey < value.length) {
              value = value[numKey];
            } else {
              console.warn(
                `Translation key "${key}" not found: array index ${numKey} out of bounds (array length: ${value.length})`
              );
              return key;
            }
          } else if (!Array.isArray(value) && k in value) {
            // Доступ к свойству объекта (включая числовые строковые ключи как "0", "1")
            value = (value as { [key: string]: TranslationValue })[k];
          } else {
            console.warn(
              `Translation key "${key}" not found for locale "${locale}" at "${k}". Available keys: ${Object.keys(value).slice(0, 10).join(', ')}${Object.keys(value).length > 10 ? '...' : ''}`
            );
            return key;
          }
        } else {
          console.warn(
            `Translation key "${key}" not found for locale "${locale}" at "${k}" (value is not an object: ${typeof value})`
          );
          return key;
        }
      }

      if (typeof value === 'string') {
        return value;
      }

      console.warn(`Translation key "${key}" returned non-string value: ${typeof value}`);
      return key;
    },
    [translations, locale]
  );

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('showcase-locale', newLocale);
  };

  useEffect(() => {
    // Загружаем сохраненный язык из localStorage
    const savedLocale = localStorage.getItem('showcase-locale') as Locale;
    if (savedLocale && (savedLocale === 'ru' || savedLocale === 'en')) {
      setLocale(savedLocale);
      setTranslations(translationsMap[savedLocale]);
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};
