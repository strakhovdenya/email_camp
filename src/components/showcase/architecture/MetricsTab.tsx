'use client';

import React, { useMemo } from 'react';
import { Typography, Box, Card, Avatar, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Security as SecurityIcon,
  Storage as DatabaseIcon,
  Api as ApiIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { useLocale } from '@/contexts/LocaleContext';

interface ProjectMetric {
  label: string;
  value: string;
  color: string;
}

interface TechHighlight {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

export function MetricsTab() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useLocale();

  const projectMetrics: ProjectMetric[] = useMemo(
    () => [
      {
        label: t('architecture.metricsTab.projectMetrics.labels.0'),
        value: t('architecture.metricsTab.projectMetrics.values.0'),
        color: '#2563eb',
      },
      {
        label: t('architecture.metricsTab.projectMetrics.labels.1'),
        value: t('architecture.metricsTab.projectMetrics.values.1'),
        color: '#7c3aed',
      },
      {
        label: t('architecture.metricsTab.projectMetrics.labels.2'),
        value: t('architecture.metricsTab.projectMetrics.values.2'),
        color: '#059669',
      },
      {
        label: t('architecture.metricsTab.projectMetrics.labels.3'),
        value: t('architecture.metricsTab.projectMetrics.values.3'),
        color: '#dc2626',
      },
      {
        label: t('architecture.metricsTab.projectMetrics.labels.4'),
        value: t('architecture.metricsTab.projectMetrics.values.4'),
        color: '#ea580c',
      },
      {
        label: t('architecture.metricsTab.projectMetrics.labels.5'),
        value: t('architecture.metricsTab.projectMetrics.values.5'),
        color: '#0891b2',
      },
    ],
    [t]
  );

  const techHighlights: TechHighlight[] = useMemo(
    () => [
      {
        icon: <SecurityIcon />,
        title: t('architecture.metricsTab.techFeatures.security.title'),
        items: [
          t('architecture.metricsTab.techFeatures.security.items.0'),
          t('architecture.metricsTab.techFeatures.security.items.1'),
          t('architecture.metricsTab.techFeatures.security.items.2'),
          t('architecture.metricsTab.techFeatures.security.items.3'),
        ],
      },
      {
        icon: <DatabaseIcon />,
        title: t('architecture.metricsTab.techFeatures.performance.title'),
        items: [
          t('architecture.metricsTab.techFeatures.performance.items.0'),
          t('architecture.metricsTab.techFeatures.performance.items.1'),
          t('architecture.metricsTab.techFeatures.performance.items.2'),
          t('architecture.metricsTab.techFeatures.performance.items.3'),
        ],
      },
      {
        icon: <CodeIcon />,
        title: t('architecture.metricsTab.techFeatures.ux.title'),
        items: [
          t('architecture.metricsTab.techFeatures.ux.items.0'),
          t('architecture.metricsTab.techFeatures.ux.items.1'),
          t('architecture.metricsTab.techFeatures.ux.items.2'),
          t('architecture.metricsTab.techFeatures.ux.items.3'),
        ],
      },
      {
        icon: <ApiIcon />,
        title: t('architecture.metricsTab.techFeatures.architecture.title'),
        items: [
          t('architecture.metricsTab.techFeatures.architecture.items.0'),
          t('architecture.metricsTab.techFeatures.architecture.items.1'),
          t('architecture.metricsTab.techFeatures.architecture.items.2'),
          t('architecture.metricsTab.techFeatures.architecture.items.3'),
        ],
      },
    ],
    [t]
  );

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 1, md: 4 },
          fontWeight: 700,
          textAlign: 'center',
          fontSize: { xs: '1rem', md: '2.125rem' },
          px: { xs: '2px', md: 0 },
          wordBreak: 'break-word',
        }}
      >
        {t('architecture.metricsTab.title')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: '4px', md: 4 },
          mb: { xs: 1, md: 6 },
        }}
      >
        {projectMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              sx={{
                p: { xs: '4px', md: 3 },
                textAlign: 'center',
                bgcolor: isDark ? 'grey.900' : 'background.paper',
                border: `1px solid ${metric.color}${isDark ? '80' : ''}`,
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: metric.color,
                  mb: { xs: '2px', md: 1 },
                  fontSize: { xs: '1.2rem', md: '2rem' },
                }}
              >
                {metric.value}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.7rem', md: '0.875rem' },
                  fontWeight: 500,
                }}
              >
                {metric.label}
              </Typography>
            </Card>
          </motion.div>
        ))}
      </Box>

      <Typography
        variant="h4"
        sx={{
          mb: { xs: 1, md: 4 },
          fontWeight: 700,
          textAlign: 'center',
          fontSize: { xs: '1rem', md: '2.125rem' },
          px: { xs: '2px', md: 0 },
          wordBreak: 'break-word',
        }}
      >
        {t('architecture.metricsTab.techFeatures.title')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: '4px', md: 4 },
        }}
      >
        {techHighlights.map((highlight, index) => (
          <Box key={highlight.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card
                sx={{
                  p: { xs: '4px', md: 3 },
                  height: '100%',
                  bgcolor: isDark ? 'grey.900' : 'background.paper',
                  border: `1px solid ${isDark ? 'grey.700' : '#e2e8f0'}`,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: { xs: '4px', md: 2 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 32, md: 48 },
                      height: { xs: 32, md: 48 },
                      mr: { xs: 1, md: 2 },
                      bgcolor: 'primary.main',
                    }}
                  >
                    {highlight.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '0.9rem', md: '1.25rem' },
                    }}
                  >
                    {highlight.title}
                  </Typography>
                </Box>
                {highlight.items.map((item, itemIndex) => (
                  <Chip
                    key={itemIndex}
                    label={item}
                    size="small"
                    variant="outlined"
                    sx={{
                      m: { xs: '1px', md: 0.5 },
                      fontSize: { xs: '0.6rem', md: '0.75rem' },
                    }}
                  />
                ))}
              </Card>
            </motion.div>
          </Box>
        ))}
      </Box>
    </>
  );
}
