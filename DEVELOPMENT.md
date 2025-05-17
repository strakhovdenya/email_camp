# Состояние разработки

## Текущая структура проекта

1. База данных (Supabase):
   - Таблица `rooms` (основная)
   - Таблица `letters` (связана с rooms через room_id)
   - View `letters_with_rooms` для удобного получения данных

2. Основные компоненты:
   - `BarcodeScanner.tsx` - сканер штрих-кодов
   - `useLetters.ts` - хук для работы с письмами
   - `database.types.ts` - типы Supabase
   - `supabase.ts` - конфигурация Supabase

## Следующие шаги

1. Настройка Supabase:
   - Создать проект
   - Выполнить миграцию из `supabase/migrations/001_initial_schema.sql`
   - Добавить переменные окружения в `.env.local`

2. Разработка компонентов:
   - Страница сканирования писем
   - Страница просмотра писем по комнатам
   - Компонент уведомлений
   - Интеграция с Telegram

3. PWA функциональность:
   - Офлайн-режим
   - Синхронизация данных
   - Push-уведомления

## Настройка окружения

1. Git и IDE:
   - Git Bash настроен через `.vscode/settings.json`
   - Основная ветка: `main`
   - Создать ветку `develop` для разработки

2. Зависимости:
   - Next.js 15.3.2
   - React 18.2.0
   - Supabase
   - React Query
   - Tailwind CSS

## Команды для разработки

```bash
# Запуск проекта
npm run dev

# Создание новой ветки для функционала
git checkout -b feature/название-функционала

# Коммит изменений
git add .
git commit -m "Описание изменений"

# Слияние изменений
git checkout main
git merge feature/название-функционала
```

## Структура базы данных

```sql
-- Таблица комнат
CREATE TABLE rooms (
    id BIGSERIAL PRIMARY KEY,
    room_number TEXT NOT NULL UNIQUE,
    telegram_chat_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Таблица писем
CREATE TABLE letters (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES rooms(id),
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    delivered_at TIMESTAMPTZ,
    sync_status TEXT NOT NULL DEFAULT 'pending',
    barcode_id TEXT NOT NULL UNIQUE,
    recipient_notified BOOLEAN NOT NULL DEFAULT false
);
``` 