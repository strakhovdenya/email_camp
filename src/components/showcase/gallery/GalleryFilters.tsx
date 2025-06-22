import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { DeviceFilter } from './DeviceFilter';
import { FunctionalFilter } from './FunctionalFilter';
import { type DeviceCategory, type FunctionalCategory, type CategoryConfig } from './galleryData';
import { galleryFiltersStyles } from './GalleryFilters.styles';

interface GalleryFiltersProps {
  deviceCategories: CategoryConfig[];
  functionalCategories: CategoryConfig[];
  selectedDeviceCategory: DeviceCategory;
  selectedFunctionalCategory: FunctionalCategory;
  onDeviceCategoryChange: (category: DeviceCategory) => void;
  onFunctionalCategoryChange: (category: FunctionalCategory) => void;
  getDeviceCategoryCount: (category: DeviceCategory) => number;
  getFunctionalCategoryCount: (category: FunctionalCategory) => number;
}

export const GalleryFilters = ({
  deviceCategories,
  functionalCategories,
  selectedDeviceCategory,
  selectedFunctionalCategory,
  onDeviceCategoryChange,
  onFunctionalCategoryChange,
  getDeviceCategoryCount,
  getFunctionalCategoryCount,
}: GalleryFiltersProps) => {
  return (
    <Box sx={galleryFiltersStyles.container}>
      {/* Device Category Filter */}
      <Box sx={galleryFiltersStyles.filterSection}>
        <Paper sx={galleryFiltersStyles.filterPaper}>
          <Typography variant="h5" sx={galleryFiltersStyles.filterTitle}>
            Устройства
          </Typography>
          <DeviceFilter
            categories={deviceCategories}
            selectedCategory={selectedDeviceCategory}
            onCategoryChange={onDeviceCategoryChange}
            getCategoryCount={getDeviceCategoryCount}
          />
        </Paper>
      </Box>

      {/* Functional Category Filter */}
      <Box sx={galleryFiltersStyles.filterSection}>
        <Paper sx={galleryFiltersStyles.filterPaper}>
          <Typography variant="h5" sx={galleryFiltersStyles.filterTitle}>
            Категории
          </Typography>
          <FunctionalFilter
            categories={functionalCategories}
            selectedCategory={selectedFunctionalCategory}
            onCategoryChange={onFunctionalCategoryChange}
            getCategoryCount={getFunctionalCategoryCount}
          />
        </Paper>
      </Box>
    </Box>
  );
};
