import React from 'react';
import { Box, Typography, Card, Slide, useTheme } from '@mui/material';
import { AnimatedCounter } from './AnimatedCounter';
import { type StatData } from './showcaseData';
import { statsSectionStyles } from './StatsSection.styles';

interface StatsSectionProps {
  stats: StatData[];
  isVisible: boolean;
}

export const StatsSection = ({ stats, isVisible }: StatsSectionProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={statsSectionStyles.container}>
      <Box sx={statsSectionStyles.grid}>
        {stats.map((stat, index) => (
          <Box key={stat.label} sx={statsSectionStyles.gridItem}>
            <Slide
              in={isVisible}
              direction="up"
              timeout={1000}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card
                sx={{
                  ...statsSectionStyles.card,
                  bgcolor: isDark ? 'grey.900' : 'background.paper',
                  borderColor: isDark ? 'grey.700' : 'divider',
                }}
              >
                <Typography variant="h3" sx={statsSectionStyles.value}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={statsSectionStyles.label}>
                  {stat.label}
                </Typography>
              </Card>
            </Slide>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
