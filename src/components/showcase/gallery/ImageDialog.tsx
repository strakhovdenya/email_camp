import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { type GalleryItem } from './galleryData';
import { imageDialogStyles } from './ImageDialog.styles';

interface ImageDialogProps {
  selectedImage: GalleryItem | null;
  onClose: () => void;
}

export const ImageDialog = ({ selectedImage, onClose }: ImageDialogProps) => {
  return (
    <Dialog
      open={!!selectedImage}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={imageDialogStyles.dialog}
    >
      {selectedImage && (
        <>
          <DialogTitle sx={imageDialogStyles.dialogTitle}>
            <Typography variant="h6" sx={imageDialogStyles.title}>
              {selectedImage.title}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={imageDialogStyles.dialogContent}>
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              width={1200}
              height={800}
              style={imageDialogStyles.image}
            />
          </DialogContent>
          <DialogActions sx={imageDialogStyles.dialogActions}>
            <Typography variant="body2" color="text.secondary" sx={imageDialogStyles.description}>
              {selectedImage.description}
            </Typography>
            <Button onClick={onClose} variant="contained">
              Закрыть
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
