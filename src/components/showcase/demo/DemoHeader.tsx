import React from 'react';
import { Card, CardContent } from '@mui/material';
import { demoHeaderStyles } from './DemoHeader.styles';

interface DemoHeaderProps {
  title: string;
  description: {
    main: string;
    subtitle: string;
  };
}

export const DemoHeader = ({ title, description }: DemoHeaderProps) => {
  return (
    <>
      <h1 className={demoHeaderStyles.title}>{title}</h1>

      <Card className={demoHeaderStyles.descriptionCard}>
        <CardContent>
          <p className={demoHeaderStyles.descriptionText}>
            <strong>{description.main}</strong>
            <br />
            {description.subtitle}
          </p>
        </CardContent>
      </Card>
    </>
  );
};
