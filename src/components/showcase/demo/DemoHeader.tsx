import React from 'react';
import { Card, CardContent } from '@mui/material';
import { demoData } from './demoData';
import { demoHeaderStyles } from './DemoHeader.styles';

export const DemoHeader = () => {
  return (
    <>
      <h1 className={demoHeaderStyles.title}>{demoData.title}</h1>

      <Card className={demoHeaderStyles.descriptionCard}>
        <CardContent>
          <p className={demoHeaderStyles.descriptionText}>
            <strong>{demoData.description.main}</strong>
            <br />
            {demoData.description.subtitle}
          </p>
        </CardContent>
      </Card>
    </>
  );
};
