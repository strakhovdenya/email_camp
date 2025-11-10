import React from 'react';
import { Box, Typography } from '@mui/material';
import { ProcessStep } from './ProcessStep';
import { getStepsData } from './stepsData';
import { howItWorksStyles } from './HowItWorks.styles';
import { useLocale } from '@/contexts/LocaleContext';

export const HowItWorks = () => {
  const { t } = useLocale();
  const stepsData = getStepsData(t);

  return (
    <Box sx={howItWorksStyles.container}>
      <Typography variant="h3" sx={howItWorksStyles.title}>
        {t('overview.howItWorks.title')}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={howItWorksStyles.subtitle}>
        {t('overview.howItWorks.subtitle')}
      </Typography>

      <Box sx={howItWorksStyles.stepsContainer}>
        {/* Vertical connecting line - hide on mobile */}
        <Box sx={howItWorksStyles.connectingLine} />

        {stepsData.map((step, index) => (
          <ProcessStep key={step.id} step={step} index={index} />
        ))}
      </Box>
    </Box>
  );
};
