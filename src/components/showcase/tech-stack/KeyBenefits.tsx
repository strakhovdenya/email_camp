'use client';

import React, { useMemo } from 'react';
import { Box, Typography, Card, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { keyBenefitsStyles } from './KeyBenefits.styles';
import { useLocale } from '@/contexts/LocaleContext';
import {
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

export const KeyBenefits = () => {
  const { t } = useLocale();

  const benefits = useMemo(
    () => [
      {
        title: t('techStack.benefits.items.0.title'),
        description: t('techStack.benefits.items.0.description'),
        icon: <SpeedIcon />,
        color: '#059669',
      },
      {
        title: t('techStack.benefits.items.1.title'),
        description: t('techStack.benefits.items.1.description'),
        icon: <SecurityIcon />,
        color: '#dc2626',
      },
      {
        title: t('techStack.benefits.items.2.title'),
        description: t('techStack.benefits.items.2.description'),
        icon: <CloudIcon />,
        color: '#2563eb',
      },
      {
        title: t('techStack.benefits.items.3.title'),
        description: t('techStack.benefits.items.3.description'),
        icon: <BuildIcon />,
        color: '#7c3aed',
      },
    ],
    [t]
  );

  return (
    <Box sx={keyBenefitsStyles.container}>
      <Typography variant="h3" sx={keyBenefitsStyles.title}>
        {t('techStack.benefits.title')}
      </Typography>
      <Box sx={keyBenefitsStyles.benefitsGrid}>
        {benefits.map((benefit, index) => (
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
