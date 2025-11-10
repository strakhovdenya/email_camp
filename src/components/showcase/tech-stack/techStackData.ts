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

export interface ArchitectureItem {
  label: string;
  color: string;
}

export const getTechStackData = (t: (key: string) => string) => ({
  frontend: [
    {
      icon: React.createElement(CodeIcon),
      title: t('techStack.technologies.frontend.0.title'),
      version: '14.0',
      description: t('techStack.technologies.frontend.0.description'),
      color: '#000000',
      features: [
        t('techStack.technologies.frontend.0.features.0'),
        t('techStack.technologies.frontend.0.features.1'),
        t('techStack.technologies.frontend.0.features.2'),
        t('techStack.technologies.frontend.0.features.3'),
      ],
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
      title: t('techStack.technologies.frontend.1.title'),
      version: '5.0',
      description: t('techStack.technologies.frontend.1.description'),
      color: '#3178c6',
      features: [
        t('techStack.technologies.frontend.1.features.0'),
        t('techStack.technologies.frontend.1.features.1'),
        t('techStack.technologies.frontend.1.features.2'),
        t('techStack.technologies.frontend.1.features.3'),
      ],
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
      title: t('techStack.technologies.frontend.2.title'),
      version: '5.14',
      description: t('techStack.technologies.frontend.2.description'),
      color: '#007fff',
      features: [
        t('techStack.technologies.frontend.2.features.0'),
        t('techStack.technologies.frontend.2.features.1'),
        t('techStack.technologies.frontend.2.features.2'),
        t('techStack.technologies.frontend.2.features.3'),
      ],
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
      title: t('techStack.technologies.frontend.3.title'),
      version: '10.16',
      description: t('techStack.technologies.frontend.3.description'),
      color: '#ff0055',
      features: [
        t('techStack.technologies.frontend.3.features.0'),
        t('techStack.technologies.frontend.3.features.1'),
        t('techStack.technologies.frontend.3.features.2'),
        t('techStack.technologies.frontend.3.features.3'),
      ],
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
      title: t('techStack.technologies.backend.0.title'),
      version: '2.38',
      description: t('techStack.technologies.backend.0.description'),
      color: '#3ecf8e',
      features: [
        t('techStack.technologies.backend.0.features.0'),
        t('techStack.technologies.backend.0.features.1'),
        t('techStack.technologies.backend.0.features.2'),
        t('techStack.technologies.backend.0.features.3'),
        t('techStack.technologies.backend.0.features.4'),
      ],
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
      title: t('techStack.technologies.backend.1.title'),
      version: 'PostgreSQL',
      description: t('techStack.technologies.backend.1.description'),
      color: '#336791',
      features: [
        t('techStack.technologies.backend.1.features.0'),
        t('techStack.technologies.backend.1.features.1'),
        t('techStack.technologies.backend.1.features.2'),
      ],
      codeExample: `-- RLS Policy
CREATE POLICY "Users can view own letters" ON letters
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.jwt() ->> 'role' = 'admin'
  );`,
    },
    {
      icon: React.createElement(SpeedIcon),
      title: t('techStack.technologies.backend.2.title'),
      version: '5.0',
      description: t('techStack.technologies.backend.2.description'),
      color: '#ff4154',
      features: [
        t('techStack.technologies.backend.2.features.0'),
        t('techStack.technologies.backend.2.features.1'),
        t('techStack.technologies.backend.2.features.2'),
        t('techStack.technologies.backend.2.features.3'),
      ],
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
      title: t('techStack.technologies.devops.0.title'),
      version: 'Platform',
      description: t('techStack.technologies.devops.0.description'),
      color: '#000000',
      features: [
        t('techStack.technologies.devops.0.features.0'),
        t('techStack.technologies.devops.0.features.1'),
        t('techStack.technologies.devops.0.features.2'),
        t('techStack.technologies.devops.0.features.3'),
      ],
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
      title: t('techStack.technologies.devops.1.title'),
      version: '8.0 + 3.0',
      description: t('techStack.technologies.devops.1.description'),
      color: '#4b32c3',
      features: [
        t('techStack.technologies.devops.1.features.0'),
        t('techStack.technologies.devops.1.features.1'),
        t('techStack.technologies.devops.1.features.2'),
        t('techStack.technologies.devops.1.features.3'),
      ],
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
      title: t('techStack.technologies.devops.2.title'),
      version: 'Playwright',
      description: t('techStack.technologies.devops.2.description'),
      color: '#45ba4b',
      features: [
        t('techStack.technologies.devops.2.features.0'),
        t('techStack.technologies.devops.2.features.1'),
        t('techStack.technologies.devops.2.features.2'),
        t('techStack.technologies.devops.2.features.3'),
      ],
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
});
