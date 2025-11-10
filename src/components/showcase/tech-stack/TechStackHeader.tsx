import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { techStackHeaderStyles } from './TechStackHeader.styles';
import { useLocale } from '@/contexts/LocaleContext';

export const TechStackHeader = () => {
  const { t } = useLocale();

  return (
    <Box sx={techStackHeaderStyles.container}>
      <Typography
        variant="h2"
        component={motion.h1}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        sx={techStackHeaderStyles.title}
      >
        {t('techStack.title')}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={techStackHeaderStyles.subtitle}>
        {t('techStack.subtitle')}
      </Typography>
    </Box>
  );
};
