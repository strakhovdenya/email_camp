import React from 'react';
import {
  Box,
  Typography,
  Chip,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { GalleryCard } from './GalleryCard';
import { type GalleryItem } from './galleryData';
import { galleryGridStyles } from './GalleryGrid.styles';

interface GalleryGridProps {
  items: GalleryItem[];
  onImageClick: (item: GalleryItem) => void;
}

export const GalleryGrid = ({ items, onImageClick }: GalleryGridProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const columns = isMobile ? 1 : isTablet ? 2 : 3;
  const gap = isMobile ? 8 : 16;

  return (
    <Box sx={galleryGridStyles.container}>
      <Typography variant="h4" sx={galleryGridStyles.title}>
        Результаты фильтрации
        <Chip label={items.length} size="small" sx={galleryGridStyles.countChip} />
      </Typography>

      <ImageList variant="masonry" cols={columns} gap={gap}>
        {items.map((item, index) => (
          <ImageListItem key={item.id}>
            <GalleryCard item={item} index={index} onImageClick={onImageClick} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
