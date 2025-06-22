import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { overviewCardStyles } from './OverviewCard.styles';

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  details: string[];
}

export const OverviewCard = ({ icon, title, description, color, details }: OverviewCardProps) => (
  <Card component={motion.div} whileHover={{ scale: 1.02 }} sx={overviewCardStyles.card(color)}>
    <CardContent sx={overviewCardStyles.cardContent}>
      <Box sx={overviewCardStyles.header}>
        <Avatar sx={overviewCardStyles.avatar(color)}>{icon}</Avatar>
        <Typography variant="h5" sx={overviewCardStyles.title}>
          {title}
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={overviewCardStyles.description}>
        {description}
      </Typography>

      <Box>
        {details.map((detail, index) => (
          <Box key={index} sx={overviewCardStyles.detailItem}>
            <Box sx={overviewCardStyles.detailBullet(color)} />
            <Typography variant="body2" color="text.secondary">
              {detail}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);
