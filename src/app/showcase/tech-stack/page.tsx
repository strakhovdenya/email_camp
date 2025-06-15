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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
  codeExample 
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
    component={motion.div}
    whileHover={{ scale: 1.02 }}
    sx={{
      height: '100%',
      background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Chip label={version} size="small" sx={{ bgcolor: `${color}20` }} />
        </Box>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        {features.map((feature, index) => (
          <Chip
            key={index}
            label={feature}
            size="small"
            variant="outlined"
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
      
      {codeExample && (
        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Пример кода
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SyntaxHighlighter
              language="typescript"
              style={oneDark}
              customStyle={{ borderRadius: 8, fontSize: '0.8rem' }}
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
}`
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
}`
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
});`
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
</motion.div>`
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
  .order('created_at', { ascending: false });`
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
  );`
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
}`
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
}`
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
}`
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ mb: 2, fontWeight: 800 }}
        >
          Технологический стек
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
          Современные технологии для создания надежного и масштабируемого приложения
        </Typography>
      </Box>

      {/* Architecture Diagram */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        sx={{ p: 4, mb: 6, textAlign: 'center' }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Архитектура системы
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 3,
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
                fontSize: '1rem',
                py: 2,
                px: item.label === '→' ? 0 : 2,
                border: item.color !== 'transparent' ? `1px solid ${item.color}40` : 'none',
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Tech Stack Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              fontSize: '1rem',
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
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {frontendTech.map((tech, index) => (
            <Box 
              key={tech.title}
              sx={{ 
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                minWidth: 400
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
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {backendTech.map((tech, index) => (
            <Box 
              key={tech.title}
              sx={{ 
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                minWidth: 400
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
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {devOpsTech.map((tech, index) => (
            <Box 
              key={tech.title}
              sx={{ 
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                minWidth: 400
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
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
          Преимущества выбранного стека
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4,
            justifyContent: 'center'
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
                minWidth: 250
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    background: `linear-gradient(135deg, ${benefit.color}10 0%, ${benefit.color}05 100%)`,
                    border: `1px solid ${benefit.color}30`,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: benefit.color,
                      width: 56,
                      height: 56,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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