import { createTheme } from '@mui/material';
import { MockDataSource } from '@/datasources/mock/MockDataSource';

// Создаем дефолтную тему MUI (как в основном приложении)
export const demoTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// Создаем глобальный экземпляр MockDataSource для демо
export const demoMockDataSource = new MockDataSource();

export const getDemoData = (t: (key: string) => string) => ({
  title: t('demo.title'),
  description: {
    main: t('demo.description.main'),
    subtitle: t('demo.description.subtitle'),
  },
  features: [
    t('demo.features.0'),
    t('demo.features.1'),
    t('demo.features.2'),
    t('demo.features.3'),
    t('demo.features.4'),
    t('demo.features.5'),
  ],
  tabs: [
    {
      label: {
        full: t('demo.tabs.home.full'),
        short: t('demo.tabs.home.short'),
      },
    },
    {
      label: {
        full: t('demo.tabs.addLetter.full'),
        short: t('demo.tabs.addLetter.short'),
        active: (room: string) => ({
          full: t('demo.tabs.addLetter.active').replace('{{room}}', room),
          short: `➕ ${room}`,
        }),
      },
    },
    {
      label: {
        full: t('demo.tabs.deliverLetters.full'),
        short: t('demo.tabs.deliverLetters.short'),
        active: (room: string) => ({
          full: t('demo.tabs.deliverLetters.active').replace('{{room}}', room),
          short: `📦 ${room}`,
        }),
      },
    },
  ],
});
