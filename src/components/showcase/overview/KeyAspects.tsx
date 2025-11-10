'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  ErrorOutline as ProblemIcon,
  Lightbulb as SolutionIcon,
  CheckCircle as ResultIcon,
} from '@mui/icons-material';
import { OverviewCard } from './OverviewCard';
import { keyAspectsStyles } from './KeyAspects.styles';
import { useLocale } from '@/contexts/LocaleContext';

export const KeyAspects = () => {
  const { t } = useLocale();

  const aspects = useMemo(
    () => [
      {
        icon: <ProblemIcon />,
        title: t('overview.keyAspects.problem.title'),
        description: t('overview.keyAspects.problem.description'),
        color: '#dc2626',
        details: [
          t('overview.keyAspects.problem.details.0'),
          t('overview.keyAspects.problem.details.1'),
          t('overview.keyAspects.problem.details.2'),
          t('overview.keyAspects.problem.details.3'),
        ],
      },
      {
        icon: <SolutionIcon />,
        title: t('overview.keyAspects.solution.title'),
        description: t('overview.keyAspects.solution.description'),
        color: '#059669',
        details: [
          t('overview.keyAspects.solution.details.0'),
          t('overview.keyAspects.solution.details.1'),
          t('overview.keyAspects.solution.details.2'),
          t('overview.keyAspects.solution.details.3'),
        ],
      },
      {
        icon: <ResultIcon />,
        title: t('overview.keyAspects.result.title'),
        description: t('overview.keyAspects.result.description'),
        color: '#2563eb',
        details: [
          t('overview.keyAspects.result.details.0'),
          t('overview.keyAspects.result.details.1'),
          t('overview.keyAspects.result.details.2'),
          t('overview.keyAspects.result.details.3'),
        ],
      },
    ],
    [t]
  );

  return (
    <Box sx={keyAspectsStyles.container}>
      <Typography variant="h3" sx={keyAspectsStyles.title}>
        {t('overview.keyAspects.title')}
      </Typography>
      <Box sx={keyAspectsStyles.aspectsGrid}>
        {aspects.map((aspect, index) => (
          <Box key={aspect.title} sx={keyAspectsStyles.aspectItem}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <OverviewCard {...aspect} />
            </motion.div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
