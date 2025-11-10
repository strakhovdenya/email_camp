import React from 'react';
import { Box, Typography } from '@mui/material';
import { FeatureCard } from './FeatureCard';
import { type FeatureData } from './showcaseData';
import { featuresSectionStyles } from './FeaturesSection.styles';
import { useLocale } from '@/contexts/LocaleContext';

interface FeaturesSectionProps {
  features: FeatureData[];
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  const { t } = useLocale();

  return (
    <Box sx={featuresSectionStyles.container}>
      <Typography variant="h2" textAlign="center" sx={featuresSectionStyles.title}>
        {t('features.title')}
      </Typography>

      <Typography
        variant="h6"
        textAlign="center"
        color="text.secondary"
        sx={featuresSectionStyles.subtitle}
      >
        {t('features.subtitle')}
      </Typography>

      <Box sx={featuresSectionStyles.grid}>
        {features.map((feature, index) => (
          <Box key={feature.title} sx={featuresSectionStyles.gridItem}>
            <FeatureCard {...feature} delay={index * 100} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
