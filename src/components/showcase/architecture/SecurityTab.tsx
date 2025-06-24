import React from 'react';
import { Typography, Box, Card, Paper, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { securityTabStyles } from './SecurityTab.styles';

interface SecurityFeature {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const securityFeatures: SecurityFeature[] = [
  {
    title: 'Row Level Security',
    description: 'Защита данных на уровне строк в PostgreSQL',
    icon: '🔒',
    features: [
      'Автоматическая фильтрация',
      'Политики доступа',
      'Защита от SQL-инъекций',
      'Контроль по ролям',
    ],
  },
  {
    title: 'JWT Authentication',
    description: 'Безопасная аутентификация с токенами',
    icon: '🎫',
    features: [
      'Статeless токены',
      'Автоматическое обновление',
      'Защищенные маршруты',
      'Middleware проверка',
    ],
  },
  {
    title: 'API Protection',
    description: 'Защита API эндпоинтов',
    icon: '🛡️',
    features: [
      'Rate limiting',
      'CORS настройки',
      'Валидация входных данных',
      'Логирование запросов',
    ],
  },
  {
    title: 'Data Encryption',
    description: 'Шифрование чувствительных данных',
    icon: '🔐',
    features: ['HTTPS/TLS', 'Хеширование паролей', 'Шифрование в БД', 'Безопасные cookies'],
  },
];

export function SecurityTab() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      <Typography variant="h4" sx={securityTabStyles.title}>
        Безопасность
      </Typography>

      <Box sx={securityTabStyles.securityGrid}>
        {securityFeatures.map((security, index) => (
          <Box
            key={security.title}
            sx={{
              gridColumn: { xs: '1', md: index < 2 ? '1 / -1' : 'auto' },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  ...securityTabStyles.securityCard,
                  bgcolor: isDark ? 'grey.900' : 'background.paper',
                  border: `1px solid ${isDark ? 'grey.700' : '#e2e8f0'}`,
                }}
              >
                <Typography variant="h3" sx={securityTabStyles.securityIcon}>
                  {security.icon}
                </Typography>
                <Typography variant="h6" sx={securityTabStyles.securityTitle}>
                  {security.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={securityTabStyles.securityDescription}
                >
                  {security.description}
                </Typography>
                {security.features.map((feature, featureIndex) => (
                  <Chip
                    key={featureIndex}
                    label={feature}
                    size="small"
                    variant="outlined"
                    sx={securityTabStyles.featureChip}
                  />
                ))}
              </Card>
            </motion.div>
          </Box>
        ))}
      </Box>

      <Paper
        sx={{
          ...securityTabStyles.codePaper,
          bgcolor: isDark ? 'grey.900' : 'background.paper',
        }}
      >
        <Typography variant="h5" sx={securityTabStyles.codeTitle}>
          Пример RLS политики
        </Typography>
        <SyntaxHighlighter language="sql" style={oneDark} customStyle={securityTabStyles.codeStyle}>
          {`-- Политика для таблицы letters
CREATE POLICY "Users can view own letters" ON letters
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.jwt() ->> 'role' = 'admin'
  );

-- Политика для вставки писем (только админы)
CREATE POLICY "Only admins can insert letters" ON letters
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );`}
        </SyntaxHighlighter>
      </Paper>
    </>
  );
}
