import React from 'react';
import { Card, CardContent, Avatar, Typography, Grow, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { type FeatureData } from './showcaseData';
import { featureCardStyles } from './FeatureCard.styles';

interface FeatureCardProps extends FeatureData {
  delay?: number;
}

export const FeatureCard = ({ icon, title, description, color, delay = 0 }: FeatureCardProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Grow in={true} timeout={1000} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        component={motion.div}
        whileHover={{
          scale: 1.05,
          boxShadow: isDark ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)',
        }}
        whileTap={{ scale: 0.95 }}
        sx={{
          ...featureCardStyles.card,
          bgcolor: isDark ? 'grey.900' : 'background.paper',
          border: `1px solid ${color}${isDark ? '40' : '30'}`,
          '&:hover': {
            ...featureCardStyles.card['&:hover'],
            borderColor: `${color}${isDark ? '60' : '50'}`,
          },
        }}
      >
        <CardContent sx={featureCardStyles.content}>
          <Avatar
            sx={{
              ...featureCardStyles.avatar,
              bgcolor: color,
              boxShadow: `0 8px 24px ${color}40`,
            }}
          >
            {icon}
          </Avatar>
          <Typography variant="h6" gutterBottom sx={featureCardStyles.title}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
};
