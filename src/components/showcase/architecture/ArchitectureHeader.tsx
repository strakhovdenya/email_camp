import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocale } from '@/contexts/LocaleContext';

export function ArchitectureHeader() {
  const { t } = useLocale();

  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
      <Typography
        variant="h2"
        component={motion.h1}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          mb: 2,
          fontWeight: 800,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
        }}
      >
        {t('architecture.title')}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          maxWidth: 800,
          mx: 'auto',
          px: { xs: 2, sm: 0 },
          fontSize: { xs: '1rem', md: '1.25rem' },
        }}
      >
        {t('architecture.subtitle')}
      </Typography>
    </Box>
  );
}
