import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import * as styles from './FeaturesHeader.styles';
import { useLocale } from '@/contexts/LocaleContext';

export function FeaturesHeader() {
  const { t } = useLocale();

  return (
    <Box sx={styles.containerStyles}>
      <Typography
        variant="h2"
        component={motion.h1}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        sx={styles.titleStyles}
      >
        {t('features.title')}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={styles.subtitleStyles}>
        {t('features.subtitle')}
      </Typography>
    </Box>
  );
}
