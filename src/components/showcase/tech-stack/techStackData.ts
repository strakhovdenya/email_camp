import React from 'react';
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Palette as PaletteIcon,
  Animation as AnimationIcon,
  Cloud as CloudIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

export interface TechItem {
  icon: React.ReactNode;
  title: string;
  version: string;
  description: string;
  color: string;
  features: string[];
  codeExample?: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export const techStackData = {
  frontend: [
    {
      icon: React.createElement(CodeIcon),
      title: 'Next.js',
      version: '14.0',
      description: 'React фреймворк с App Router, SSR и оптимизациями',
      color: '#000000',
      features: ['App Router', 'Server Components', 'API Routes', 'Image Optimization'],
      codeExample: `// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}`,
    },
    {
      icon: React.createElement(CodeIcon),
      title: 'TypeScript',
      version: '5.0',
      description: 'Строгая типизация для надежности и лучшего DX',
      color: '#3178c6',
      features: ['Strict Mode', 'Type Safety', 'IntelliSense', 'Refactoring'],
      codeExample: `interface LetterWithRelations {
  id: string;
  status: 'pending' | 'delivered';
  created_at: string;
  rooms?: {
    room_number: string;
  };
  users?: {
    first_name: string;
    last_name: string;
  };
}`,
    },
    {
      icon: React.createElement(PaletteIcon),
      title: 'Material-UI',
      version: '5.14',
      description: 'Компонентная библиотека с Material Design',
      color: '#007fff',
      features: ['Theming', 'Responsive', 'Accessibility', 'Customization'],
      codeExample: `const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});`,
    },
    {
      icon: React.createElement(AnimationIcon),
      title: 'Framer Motion',
      version: '10.16',
      description: 'Библиотека анимаций для React компонентов',
      color: '#ff0055',
      features: ['Gestures', 'Layout Animations', 'Scroll Triggers', 'Variants'],
      codeExample: `<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>`,
    },
  ],
  backend: [
    {
      icon: React.createElement(StorageIcon),
      title: 'Supabase',
      version: '2.38',
      description: 'Backend-as-a-Service с PostgreSQL и real-time',
      color: '#3ecf8e',
      features: ['PostgreSQL', 'Real-time', 'Auth', 'Storage', 'Edge Functions'],
      codeExample: `const { data, error } = await supabase
  .from('letters')
  .select(\`
    *,
    rooms (room_number),
    users (first_name, last_name)
  \`)
  .eq('status', 'pending')
  .order('created_at', { ascending: false });`,
    },
    {
      icon: React.createElement(SecurityIcon),
      title: 'Row Level Security',
      version: 'PostgreSQL',
      description: 'Политики безопасности на уровне строк БД',
      color: '#336791',
      features: ['User Isolation', 'Role-based Access', 'Data Protection'],
      codeExample: `-- RLS Policy
CREATE POLICY "Users can view own letters" ON letters
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.jwt() ->> 'role' = 'admin'
  );`,
    },
    {
      icon: React.createElement(SpeedIcon),
      title: 'React Query',
      version: '5.0',
      description: 'Управление серверным состоянием и кэширование',
      color: '#ff4154',
      features: ['Caching', 'Background Updates', 'Optimistic Updates', 'Offline Support'],
      codeExample: `export function useLetters() {
  return useQuery({
    queryKey: ['letters'],
    queryFn: async () => {
      const response = await fetch('/api/letters');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}`,
    },
  ],
  devops: [
    {
      icon: React.createElement(CloudIcon),
      title: 'Vercel',
      version: 'Platform',
      description: 'Платформа для деплоя с автоматическим CI/CD',
      color: '#000000',
      features: ['Auto Deploy', 'Preview URLs', 'Analytics', 'Edge Network'],
      codeExample: `// vercel.json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "regions": ["fra1"]
}`,
    },
    {
      icon: React.createElement(BuildIcon),
      title: 'ESLint + Prettier',
      version: '8.0 + 3.0',
      description: 'Линтинг и форматирование кода',
      color: '#4b32c3',
      features: ['Code Quality', 'Formatting', 'TypeScript Rules', 'Auto Fix'],
      codeExample: `// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}`,
    },
    {
      icon: React.createElement(AnimationIcon),
      title: 'Screenshot Automation',
      version: 'Playwright',
      description: 'Автоматическая генерация скриншотов для галереи',
      color: '#45ba4b',
      features: ['Auto Screenshots', 'Mobile + Desktop', 'Auth Flow', 'Gallery Sync'],
      codeExample: `// scripts/take-screenshots.cjs
// Сначала страницы авторизации (без входа)
for (const pageConfig of pagesBeforeAuth) {
  await takeScreenshot(page, pageConfig, baseDir, device);
}

// Затем авторизация и остальные страницы
const isLoggedIn = await loginAsAdmin(page);
if (isLoggedIn) {
  for (const pageConfig of pagesAfterAuth) {
    await takeScreenshot(page, pageConfig, baseDir, device);
  }
}`,
    },
  ],
  benefits: [
    {
      title: 'Производительность',
      description: 'SSR, оптимизация изображений, кэширование запросов',
      icon: React.createElement(SpeedIcon),
      color: '#059669',
    },
    {
      title: 'Безопасность',
      description: 'RLS, аутентификация, валидация на всех уровнях',
      icon: React.createElement(SecurityIcon),
      color: '#dc2626',
    },
    {
      title: 'Масштабируемость',
      description: 'Serverless архитектура, автоматическое масштабирование',
      icon: React.createElement(CloudIcon),
      color: '#2563eb',
    },
    {
      title: 'Developer Experience',
      description: 'TypeScript, hot reload, автоматическое тестирование',
      icon: React.createElement(BuildIcon),
      color: '#7c3aed',
    },
  ],
  architecture: [
    { label: 'Next.js Frontend', color: '#000000' },
    { label: '→', color: 'transparent' },
    { label: 'API Routes', color: '#2563eb' },
    { label: '→', color: 'transparent' },
    { label: 'Supabase', color: '#3ecf8e' },
    { label: '→', color: 'transparent' },
    { label: 'PostgreSQL', color: '#336791' },
  ],
};
