'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Palette as PaletteIcon,
  Animation as AnimationIcon,
  Cloud as CloudIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tech-tabpanel-${index}`}
      aria-labelledby={`tech-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: '4px', md: 3 }, overflow: 'hidden', width: '100%', minWidth: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TechCard = ({
  icon,
  title,
  description,
  version,
  color,
  features,
  codeExample,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  version: string;
  color: string;
  features: string[];
  codeExample?: string;
}) => (
  <Card
    sx={{
      height: '100%',
      background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
      overflow: 'hidden',
    }}
  >
    <CardContent sx={{ p: { xs: '4px', md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: '4px', md: 2 } }}>
        <Avatar
          sx={{
            bgcolor: color,
            mr: { xs: '4px', md: 2 },
            width: { xs: 24, md: 40 },
            height: { xs: 24, md: 40 },
          }}
        >
          {icon}
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: { xs: '0.85rem', md: '1.25rem' } }}
          >
            {title}
          </Typography>
          <Chip
            label={version}
            size="small"
            sx={{ bgcolor: `${color}20`, fontSize: { xs: '0.6rem', md: '0.75rem' } }}
          />
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: { xs: '4px', md: 2 }, fontSize: { xs: '0.7rem', md: '0.875rem' } }}
      >
        {description}
      </Typography>

      <Box sx={{ mb: { xs: '4px', md: 2 } }}>
        {features.map((feature, index) => (
          <Chip
            key={index}
            label={feature}
            size="small"
            variant="outlined"
            sx={{
              mr: { xs: '2px', md: 1 },
              mb: { xs: '2px', md: 1 },
              fontSize: { xs: '0.6rem', md: '0.75rem' },
            }}
          />
        ))}
      </Box>

      {codeExample && (
        <Accordion sx={{ mt: { xs: '4px', md: 2 } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', md: '0.875rem' } }}
            >
              Пример кода
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SyntaxHighlighter
              language="typescript"
              style={oneDark}
              customStyle={{ borderRadius: 8, fontSize: '0.65rem', padding: '8px' }}
            >
              {codeExample}
            </SyntaxHighlighter>
          </AccordionDetails>
        </Accordion>
      )}
    </CardContent>
  </Card>
);

export default function TechStackPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const frontendTech = [
    {
      icon: <CodeIcon />,
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
      icon: <CodeIcon />,
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
      icon: <PaletteIcon />,
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
      icon: <AnimationIcon />,
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
  ];

  const backendTech = [
    {
      icon: <StorageIcon />,
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
      icon: <SecurityIcon />,
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
      icon: <SpeedIcon />,
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
  ];

  const devOpsTech = [
    {
      icon: <CloudIcon />,
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
      icon: <BuildIcon />,
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
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 0.5, md: 4 },
        px: { xs: 0, sm: 1, md: 3 },
        width: '100%',
        maxWidth: { xs: '100vw', md: 'xl' },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 1, md: 6 },
          px: { xs: '4px', md: 0 },
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            mb: { xs: 0.5, md: 2 },
            fontWeight: 800,
            fontSize: { xs: '1.3rem', sm: '2.5rem', md: '3.5rem' },
            wordBreak: 'break-word',
          }}
        >
          Технологический стек
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: '100%',
            mx: 'auto',
            px: { xs: '4px', sm: 0 },
            fontSize: { xs: '0.75rem', md: '1.25rem' },
            wordBreak: 'break-word',
            lineHeight: { xs: 1.2, md: 1.5 },
          }}
        >
          Современные технологии для создания надежного и масштабируемого приложения
        </Typography>
      </Box>

      {/* Architecture Diagram */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        sx={{ p: { xs: '4px', md: 4 }, mb: { xs: 1, md: 6 }, textAlign: 'center' }}
      >
        <Typography
          variant="h4"
          sx={{ mb: { xs: 1, md: 3 }, fontWeight: 700, fontSize: { xs: '1rem', md: '2.125rem' } }}
        >
          Архитектура системы
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: { xs: '4px', md: 3 },
          }}
        >
          {[
            { label: 'Next.js Frontend', color: '#000000' },
            { label: '→', color: 'transparent' },
            { label: 'API Routes', color: '#2563eb' },
            { label: '→', color: 'transparent' },
            { label: 'Supabase', color: '#3ecf8e' },
            { label: '→', color: 'transparent' },
            { label: 'PostgreSQL', color: '#336791' },
          ].map((item, index) => (
            <Chip
              key={index}
              label={item.label}
              sx={{
                bgcolor: item.color !== 'transparent' ? `${item.color}20` : 'transparent',
                color: item.color !== 'transparent' ? item.color : 'text.secondary',
                fontWeight: 600,
                fontSize: { xs: '0.65rem', md: '1rem' },
                py: { xs: '2px', md: 2 },
                px: item.label === '→' ? 0 : { xs: '4px', md: 2 },
                border: item.color !== 'transparent' ? `1px solid ${item.color}40` : 'none',
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Tech Stack Tabs */}
      <Paper sx={{ mb: { xs: 1, md: 4 }, overflow: 'hidden' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered={false}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              fontSize: { xs: '0.7rem', md: '1rem' },
              minWidth: { xs: 60, md: 'auto' },
              px: { xs: '8px', md: 3 },
            },
            '& .MuiTabs-scroller': {
              overflow: 'auto !important',
            },
          }}
        >
          <Tab label="Frontend" />
          <Tab label="Backend" />
          <Tab label="DevOps" />
        </Tabs>
      </Paper>

      {/* Frontend Technologies */}
      <TabPanel value={tabValue} index={0}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: '4px', md: 4 },
            justifyContent: 'center',
          }}
        >
          {frontendTech.map((tech, index) => (
            <Box
              key={tech.title}
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                minWidth: { xs: 0, md: 400 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TechCard {...tech} />
              </motion.div>
            </Box>
          ))}
        </Box>
      </TabPanel>

      {/* Backend Technologies */}
      <TabPanel value={tabValue} index={1}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: '4px', md: 4 },
            justifyContent: 'center',
          }}
        >
          {backendTech.map((tech, index) => (
            <Box
              key={tech.title}
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                minWidth: { xs: 0, md: 400 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TechCard {...tech} />
              </motion.div>
            </Box>
          ))}
        </Box>
      </TabPanel>

      {/* DevOps Technologies */}
      <TabPanel value={tabValue} index={2}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: '4px', md: 4 },
            justifyContent: 'center',
          }}
        >
          {devOpsTech.map((tech, index) => (
            <Box
              key={tech.title}
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                minWidth: { xs: 0, md: 400 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TechCard {...tech} />
              </motion.div>
            </Box>
          ))}
        </Box>
      </TabPanel>

      {/* Key Benefits */}
      <Box sx={{ mt: { xs: 1, md: 8 }, textAlign: 'center', px: { xs: '4px', md: 0 } }}>
        <Typography
          variant="h3"
          sx={{ mb: { xs: 1, md: 4 }, fontWeight: 700, fontSize: { xs: '1.2rem', md: '3rem' } }}
        >
          Преимущества выбранного стека
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: '4px', md: 4 },
            justifyContent: 'center',
          }}
        >
          {[
            {
              title: 'Производительность',
              description: 'SSR, оптимизация изображений, кэширование запросов',
              icon: <SpeedIcon />,
              color: '#059669',
            },
            {
              title: 'Безопасность',
              description: 'RLS, аутентификация, валидация на всех уровнях',
              icon: <SecurityIcon />,
              color: '#dc2626',
            },
            {
              title: 'Масштабируемость',
              description: 'Serverless архитектура, автоматическое масштабирование',
              icon: <CloudIcon />,
              color: '#2563eb',
            },
            {
              title: 'Developer Experience',
              description: 'TypeScript, hot reload, автоматическое тестирование',
              icon: <BuildIcon />,
              color: '#7c3aed',
            },
          ].map((benefit, index) => (
            <Box
              key={benefit.title}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 24px)' },
                minWidth: { xs: 0, md: 250 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card
                  sx={{
                    p: { xs: '4px', md: 3 },
                    textAlign: 'center',
                    height: '100%',
                    background: `linear-gradient(135deg, ${benefit.color}10 0%, ${benefit.color}05 100%)`,
                    border: `1px solid ${benefit.color}30`,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: benefit.color,
                      width: { xs: 32, md: 56 },
                      height: { xs: 32, md: 56 },
                      mx: 'auto',
                      mb: { xs: '4px', md: 2 },
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: { xs: '2px', md: 1 },
                      fontSize: { xs: '0.85rem', md: '1.25rem' },
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
                  >
                    {benefit.description}
                  </Typography>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
