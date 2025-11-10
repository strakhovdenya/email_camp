'use client';

import React from 'react';
import { Card, CardContent } from '@mui/material';
import { demoFeaturesStyles } from './DemoFeatures.styles';
import { useLocale } from '@/contexts/LocaleContext';

interface DemoFeaturesProps {
  features: string[];
}

export const DemoFeatures = ({ features }: DemoFeaturesProps) => {
  const { t } = useLocale();

  return (
    <Card className={demoFeaturesStyles.card}>
      <CardContent>
        <h2 className={demoFeaturesStyles.title}>{t('demo.features.title')}</h2>
        <div className={demoFeaturesStyles.featuresContainer}>
          {features.map((feature, index) => (
            <div key={index} className={demoFeaturesStyles.featureItem}>
              • {feature}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
