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

export const demoData = {
  title: 'Демо приложения',
  description: {
    main: 'Это демо версия приложения с mock данными.',
    subtitle:
      'Здесь используются реальные компоненты приложения, но данные берутся из локального mock источника.',
  },
  features: [
    'Используются реальные компоненты: RoomCard, AddLetterForm, LetterList',
    'Данные берутся из MockDataSource (локальные демо-данные)',
    'Все хуки работают через DataSource паттерн',
    'Кнопка "Добавить" переводит на форму добавления письма для комнаты',
    'Кнопка "Выдать" переводит на страницу выдачи писем для комнаты',
    'Форма добавления письма полностью функциональна',
  ],
  tabs: [
    {
      label: {
        full: 'Главная страница',
        short: 'Главная',
      },
    },
    {
      label: {
        full: 'Добавить письмо',
        short: 'Добавить',
        active: (room: string) => ({
          full: `Добавить (${room})`,
          short: `➕ ${room}`,
        }),
      },
    },
    {
      label: {
        full: 'Выдать письма',
        short: 'Выдать',
        active: (room: string) => ({
          full: `Выдать (${room})`,
          short: `📦 ${room}`,
        }),
      },
    },
  ],
};
