import React from 'react';
import { Box, Typography } from '@mui/material';
import { ProcessStep } from './ProcessStep';
import { stepsData } from './stepsData';
import { howItWorksStyles } from './HowItWorks.styles';

export const HowItWorks = () => {
  return (
    <Box sx={howItWorksStyles.container}>
      <Typography variant="h3" sx={howItWorksStyles.title}>
        Как это работает
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={howItWorksStyles.subtitle}>
        От поступления письма до получения жителем лагеря — весь процесс автоматизирован
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
