import React from 'react';
import { Box, Button, Card, CardContent, Avatar, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { type DeviceCategory, type CategoryConfig } from './galleryData';
import { deviceFilterStyles } from './DeviceFilter.styles';

interface DeviceFilterProps {
  categories: CategoryConfig[];
  selectedCategory: DeviceCategory;
  onCategoryChange: (category: DeviceCategory) => void;
  getCategoryCount: (category: DeviceCategory) => number;
}

export const DeviceFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  getCategoryCount,
}: DeviceFilterProps) => {
  return (
    <Box sx={deviceFilterStyles.container}>
      {categories.map((category) => (
        <Box key={category.key} sx={{ display: { xs: 'block', md: 'none' } }}>
          {/* Mobile Version - Compact Buttons */}
          <Button
            component={motion.div}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.key as DeviceCategory)}
            variant={selectedCategory === category.key ? 'contained' : 'outlined'}
            size="small"
            startIcon={category.icon}
            sx={{
              ...deviceFilterStyles.mobileButton,
              backgroundColor: selectedCategory === category.key ? category.color : 'transparent',
              borderColor: category.color,
              color: selectedCategory === category.key ? 'white' : category.color,
              '&:hover': {
                backgroundColor:
                  selectedCategory === category.key ? category.color : `${category.color}10`,
                borderColor: category.color,
              },
            }}
          >
            <Box sx={deviceFilterStyles.mobileButtonContent}>
              <Typography variant="body2" sx={deviceFilterStyles.mobileButtonLabel}>
                {category.label}
              </Typography>
              <Typography variant="caption" sx={deviceFilterStyles.mobileButtonCount}>
                {getCategoryCount(category.key as DeviceCategory)}
              </Typography>
            </Box>
          </Button>
        </Box>
      ))}
      {categories.map((category) => (
        <Box key={`desktop-${category.key}`} sx={{ display: { xs: 'none', md: 'block' } }}>
          {/* Desktop Version - Original Cards */}
          <Card
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.key as DeviceCategory)}
            sx={{
              ...deviceFilterStyles.desktopCard,
              background:
                selectedCategory === category.key
                  ? `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`
                  : 'background.paper',
              border:
                selectedCategory === category.key
                  ? `2px solid ${category.color}`
                  : '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <CardContent sx={deviceFilterStyles.desktopCardContent}>
              <Avatar
                sx={{
                  bgcolor: category.color,
                  mx: 'auto',
                  mb: 0.5,
                  width: 30,
                  height: 30,
                }}
              >
                {category.icon}
              </Avatar>
              <Typography variant="body2" sx={deviceFilterStyles.desktopCardLabel}>
                {category.label}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={deviceFilterStyles.desktopCardCount}
              >
                {getCategoryCount(category.key as DeviceCategory)} элементов
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};
