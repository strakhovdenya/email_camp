# Email Camp

Modern mail tracking and delivery system for camps.

## Showcase

The application includes a comprehensive showcase section that demonstrates the project's features, architecture, and capabilities. Access it at:

**Route: `/showcase`** ( https://email-camp-khaki.vercel.app/showcase )

The showcase provides an interactive tour of the Email Camp system with the following sections:

### Available Routes

- **`/showcase`** - Main showcase page with hero section, statistics, features, and tech stack overview
- **`/showcase/overview`** - Project overview, key aspects, how it works, and notification examples
- **`/showcase/features`** - Detailed feature descriptions with benefits and statistics
- **`/showcase/architecture`** - System architecture including DataSource pattern, database schema, API structure, security features, and metrics
- **`/showcase/tech-stack`** - Technology stack details with code examples and key benefits
- **`/showcase/demo`** - Interactive demo mode (see Demo Mode section below)
- **`/showcase/gallery`** - Screenshot gallery of the application

### Multilingual Support

The showcase section features full multilingual support with seamless language switching:

- **Supported Languages**: English (en) and Russian (ru)
- **Language Switching**: Users can switch between languages using the language selector in the navigation
- **Translation System**: 
  - Uses React Context (`LocaleContext`) for state management
  - Translation files stored in `src/locales/en.json` and `src/locales/ru.json`
  - All text content is dynamically translated based on the selected locale
  - Language preference is saved in localStorage and persists across sessions
- **Implementation**: 
  - The `useLocale` hook provides access to the current locale and translation function `t(key)`
  - All showcase components use the `t()` function for text rendering
  - Translation keys follow a nested structure (e.g., `demo.pages.home.title`)
  - Supports array access in translation keys (e.g., `features.0`, `features.1`)

### Demo Mode

The showcase includes a fully functional demo mode at `/showcase/demo` that allows visitors to explore the application without requiring database access:

- **Mock Data Source**: Uses `MockDataSource` with pre-configured demo data
- **Real Components**: All actual application components are used (RoomCard, AddLetterForm, LetterList, etc.)
- **Full Functionality**: 
  - Browse rooms and letters
  - Add new letters with photos
  - Deliver letters to users
  - Filter letters by users
- **Three Demo Tabs**:
  1. **Home Page** - View rooms with letters awaiting delivery
  2. **Add Letter** - Add new letters to a selected room
  3. **Deliver Letters** - Deliver letters to users with filtering capabilities
- **DataSource Pattern**: All hooks work through the DataSource pattern, demonstrating the architecture's flexibility
- **Multilingual**: Demo mode is fully translated and supports language switching

The demo mode showcases the application's capabilities while providing a safe, isolated environment for testing and exploration.

## Features

- Room management (room_number)
- Letter tracking (linked to room, status, creation date, delivery date, sync_status)
- User management (admin, staff, guest) with roles and email
- Email notifications to recipients when a letter is added
- Letter filtering by users (recipients)
- Email notification status (sent/not sent)
- View and deliver letters by rooms
- Centralized logic for adding and delivering letters (React Query hooks)
- Strict TypeScript typing
- Modern UI with TailwindCSS
- Toast notifications for all key actions and errors

## Technologies

- Next.js 14 (App Router)
- Supabase (Postgres, RLS, Storage)
- React Query
- TailwindCSS
- Resend (email delivery)

## Database Structure

- **rooms**: id, room_number, telegram_chat_id, created_at
- **users**: id, first_name, last_name, phone, email, room_id, role, created_at
- **letters**: id, room_id, status, created_at, delivered_at, sync_status, note, photo_url, user_id, notification_statuses

## How It Works

1. The main page displays a list of rooms and the number of letters in each.
2. For each room, you can open a separate page (`/room/[roomNumber]`) that displays a list of letters and a form to add a new letter.
3. When adding a letter, you select a recipient (user) and can upload a photo.
4. The system sends an email notification to the recipient (if an email is provided).
5. On the letter delivery page (`/deliver/[roomNumber]`), you can filter letters by users and mark them as delivered.
6. For each letter, the email notification status is displayed (with a warning if not sent).

## Security

- RLS (Row Level Security) is enabled for all tables.
- For MVP, insert/update is allowed for all users.

## Interface Example

- Letter addition form with fields for room, description, photo, and recipient
- List of letters with status, recipient name, delivery date, and email notification status
- Toast notifications for all actions

## Quick Start

1. Clone the repository:
```bash
git clone <repository-URL>
cd email_camp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=your-resend-key
```

4. Run the project:
```bash
npm run dev
```

5. Visit the showcase:
```
http://localhost:3000/showcase
```

## License

MIT
