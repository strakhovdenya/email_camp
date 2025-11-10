'use client';

import React, { useMemo } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { architectureDiagramStyles } from './ArchitectureDiagram.styles';
import { useLocale } from '@/contexts/LocaleContext';

export const ArchitectureDiagram = () => {
  const { t } = useLocale();

  const architectureLabels = useMemo(
    () => [
      { label: t('techStack.architecture.labels.0'), color: '#000000' },
      { label: t('techStack.architecture.labels.1'), color: 'transparent' },
      { label: t('techStack.architecture.labels.2'), color: '#2563eb' },
      { label: t('techStack.architecture.labels.3'), color: 'transparent' },
      { label: t('techStack.architecture.labels.4'), color: '#3ecf8e' },
      { label: t('techStack.architecture.labels.5'), color: 'transparent' },
      { label: t('techStack.architecture.labels.6'), color: '#336791' },
    ],
    [t]
  );

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={architectureDiagramStyles.container}
    >
      <Typography variant="h4" sx={architectureDiagramStyles.title}>
        {t('techStack.architecture.title')}
      </Typography>
      <Box sx={architectureDiagramStyles.diagramContainer}>
        {architectureLabels.map((item, index) => (
          <Chip key={index} label={item.label} sx={architectureDiagramStyles.chip(item.color)} />
        ))}
      </Box>
    </Paper>
  );
};
