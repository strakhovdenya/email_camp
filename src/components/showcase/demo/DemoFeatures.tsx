import React from 'react';
import { Card, CardContent } from '@mui/material';
import { demoData } from './demoData';
import { demoFeaturesStyles } from './DemoFeatures.styles';

export const DemoFeatures = () => {
  return (
    <Card className={demoFeaturesStyles.card}>
      <CardContent>
        <h2 className={demoFeaturesStyles.title}>Особенности демо:</h2>
        <div className={demoFeaturesStyles.featuresContainer}>
          {demoData.features.map((feature, index) => (
            <div key={index} className={demoFeaturesStyles.featureItem}>
              • {feature}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
