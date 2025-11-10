'use client';

import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { Launch as LaunchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { techStackSectionStyles } from './TechStackSection.styles';
import { useLocale } from '@/contexts/LocaleContext';

interface TechStackSectionProps {
  techStack: string[];
}

export const TechStackSection = ({ techStack }: TechStackSectionProps) => {
  const { t } = useLocale();

  return (
    <Box sx={techStackSectionStyles.container}>
      <Typography variant="h3" sx={techStackSectionStyles.title}>
        {t('hero.techStackTitle')}
      </Typography>

      <Box sx={techStackSectionStyles.chipContainer}>
        {techStack.map((tech, index) => (
          <Chip
            key={tech}
            label={tech}
            component={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            sx={techStackSectionStyles.chip}
          />
        ))}
      </Box>

      <Button
        variant="outlined"
        size="large"
        endIcon={<LaunchIcon />}
        component={Link}
        href="/showcase/tech-stack"
        sx={techStackSectionStyles.button}
      >
        {t('hero.learnMoreTech')}
      </Button>
    </Box>
  );
};
