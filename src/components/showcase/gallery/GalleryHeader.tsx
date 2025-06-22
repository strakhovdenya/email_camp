import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { galleryHeaderStyles } from './GalleryHeader.styles';

interface GalleryHeaderProps {
  title: string;
  subtitle: string;
}

export const GalleryHeader = ({ title, subtitle }: GalleryHeaderProps) => {
  return (
    <Box sx={galleryHeaderStyles.container}>
      <Typography
        variant="h2"
        component={motion.h1}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        sx={galleryHeaderStyles.title}
      >
        {title}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={galleryHeaderStyles.subtitle}>
        {subtitle}
      </Typography>
    </Box>
  );
};
