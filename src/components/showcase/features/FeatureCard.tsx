import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, useTheme } from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import * as styles from './FeatureCard.styles';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  stats?: { label: string; value: string; color?: string }[];
}

export function FeatureCard({
  title,
  description,
  icon,
  color,
  benefits,
  stats,
}: FeatureCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      sx={{
        ...styles.getCardStyles(),
        bgcolor: isDark ? 'grey.900' : 'background.paper',
        border: `2px solid ${color}${isDark ? '60' : '30'}`,
      }}
    >
      <CardContent sx={styles.cardContentStyles}>
        {/* Icon Header */}
        <Box sx={styles.headerStyles}>
          <Avatar sx={styles.getAvatarStyles(color)}>{icon}</Avatar>
          <Box>
            <Typography variant="h5" sx={styles.titleStyles}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>

        {/* Benefits */}
        <Box sx={styles.getBenefitsContainerStyles(!!stats)}>
          {benefits.map((benefit, index) => (
            <Box key={index} sx={styles.benefitItemStyles}>
              <CheckIcon sx={styles.getBenefitIconStyles(color)} />
              <Typography variant="body2" sx={styles.benefitTextStyles}>
                {benefit}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Stats */}
        {stats && (
          <Box sx={styles.statsContainerStyles}>
            {stats.map((stat, index) => (
              <Chip
                key={index}
                label={`${stat.value} ${stat.label}`}
                sx={styles.getStatChipStyles(color, stat.color)}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
