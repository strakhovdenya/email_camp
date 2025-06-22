import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { StepData } from './stepsData';
import { processStepStyles } from './ProcessStep.styles';

interface ProcessStepProps {
  step: StepData;
  index: number;
}

export const ProcessStep = ({ step, index }: ProcessStepProps) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      sx={processStepStyles.stepContainer}
    >
      <Box sx={processStepStyles.stepLayout(step.side)}>
        <Box sx={processStepStyles.illustrationContainer(step.side)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Box sx={processStepStyles.illustration(step.color)}>{step.illustration}</Box>
          </motion.div>
        </Box>
        <Box sx={processStepStyles.cardContainer(step.side)}>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${step.color}20` }}
            sx={processStepStyles.card(step.color)}
          >
            <Box sx={processStepStyles.stepNumber(step.color, step.side)}>{step.id}</Box>
            <CardContent sx={processStepStyles.cardContent}>
              <Box sx={processStepStyles.header}>
                <Avatar sx={processStepStyles.avatar(step.color)}>{step.icon}</Avatar>
                <Typography variant="h5" sx={processStepStyles.title}>
                  {step.title}
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={processStepStyles.description}>
                {step.description}
              </Typography>
              <Box>
                {step.details.map((detail, detailIndex) => (
                  <Box key={detailIndex} sx={processStepStyles.detailItem}>
                    <Box sx={processStepStyles.detailBullet(step.color)} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={processStepStyles.detailText}
                    >
                      {detail}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
