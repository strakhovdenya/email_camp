import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { overviewHeaderStyles } from './OverviewHeader.styles';
import { useLocale } from '@/contexts/LocaleContext';

export const OverviewHeader = () => {
  const { t } = useLocale();

  return (
    <Box sx={overviewHeaderStyles.container}>
      <Typography
        variant="h2"
        component={motion.h1}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        sx={overviewHeaderStyles.title}
      >
        {t('overview.title')}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={overviewHeaderStyles.subtitle}>
        {t('overview.subtitle')}
      </Typography>
    </Box>
  );
};
