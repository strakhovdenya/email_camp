'use client';

import React, { useMemo } from 'react';
import { Typography, Box, Card, Paper, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { securityTabStyles } from './SecurityTab.styles';
import { useLocale } from '@/contexts/LocaleContext';

interface SecurityFeature {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export function SecurityTab() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useLocale();

  const securityFeatures: SecurityFeature[] = useMemo(
    () => [
      {
        title: t('architecture.securityTab.rls.title'),
        description: t('architecture.securityTab.rls.description'),
        icon: '🔒',
        features: [
          t('architecture.securityTab.rls.features.0'),
          t('architecture.securityTab.rls.features.1'),
          t('architecture.securityTab.rls.features.2'),
          t('architecture.securityTab.rls.features.3'),
        ],
      },
      {
        title: t('architecture.securityTab.jwt.title'),
        description: t('architecture.securityTab.jwt.description'),
        icon: '🎫',
        features: [
          t('architecture.securityTab.jwt.features.0'),
          t('architecture.securityTab.jwt.features.1'),
          t('architecture.securityTab.jwt.features.2'),
          t('architecture.securityTab.jwt.features.3'),
        ],
      },
      {
        title: t('architecture.securityTab.apiProtection.title'),
        description: t('architecture.securityTab.apiProtection.description'),
        icon: '🛡️',
        features: [
          t('architecture.securityTab.apiProtection.features.0'),
          t('architecture.securityTab.apiProtection.features.1'),
          t('architecture.securityTab.apiProtection.features.2'),
          t('architecture.securityTab.apiProtection.features.3'),
        ],
      },
      {
        title: t('architecture.securityTab.encryption.title'),
        description: t('architecture.securityTab.encryption.description'),
        icon: '🔐',
        features: [
          t('architecture.securityTab.encryption.features.0'),
          t('architecture.securityTab.encryption.features.1'),
          t('architecture.securityTab.encryption.features.2'),
          t('architecture.securityTab.encryption.features.3'),
        ],
      },
    ],
    [t]
  );

  return (
    <>
      <Typography variant="h4" sx={securityTabStyles.title}>
        {t('architecture.securityTab.title')}
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
          {t('architecture.securityTab.rlsExample.title')}
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
