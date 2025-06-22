import React from 'react';
import { Card, CardContent, CardMedia, Box, Typography, Chip, IconButton } from '@mui/material';
import { ZoomIn as ZoomIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { type GalleryItem } from './galleryData';
import { galleryCardStyles } from './GalleryCard.styles';

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onImageClick: (item: GalleryItem) => void;
}

export const GalleryCard = ({ item, index, onImageClick }: GalleryCardProps) => {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      sx={galleryCardStyles.card}
      onClick={() => onImageClick(item)}
    >
      <Box sx={galleryCardStyles.imageContainer}>
        <CardMedia
          component="img"
          height="200"
          image={item.image}
          alt={item.title}
          sx={galleryCardStyles.image}
        />
        <Box sx={galleryCardStyles.overlay}>
          <IconButton sx={galleryCardStyles.zoomButton}>
            <ZoomIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <CardContent>
        <Typography variant="h6" sx={galleryCardStyles.title}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={galleryCardStyles.description}>
          {item.description}
        </Typography>
        <Box sx={galleryCardStyles.tagsContainer}>
          {item.tags.map((tag, tagIndex) => (
            <Chip key={tagIndex} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
