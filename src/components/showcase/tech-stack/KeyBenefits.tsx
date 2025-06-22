import React from 'react';
import { Box, Typography, Card, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { techStackData } from './techStackData';
import { keyBenefitsStyles } from './KeyBenefits.styles';

export const KeyBenefits = () => {
  return (
    <Box sx={keyBenefitsStyles.container}>
      <Typography variant="h3" sx={keyBenefitsStyles.title}>
        Преимущества выбранного стека
      </Typography>
      <Box sx={keyBenefitsStyles.benefitsGrid}>
        {techStackData.benefits.map((benefit, index) => (
          <Box key={benefit.title} sx={keyBenefitsStyles.benefitItem}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card sx={keyBenefitsStyles.benefitCard(benefit.color)}>
                <Avatar sx={keyBenefitsStyles.benefitAvatar(benefit.color)}>{benefit.icon}</Avatar>
                <Typography variant="h6" sx={keyBenefitsStyles.benefitTitle}>
                  {benefit.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={keyBenefitsStyles.benefitDescription}
                >
                  {benefit.description}
                </Typography>
              </Card>
            </motion.div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
