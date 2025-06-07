import React, { useState, useCallback, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const LetterPhotoButton: React.FC<{ url: string }> = ({ url }) => {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setScale(1);
    setOpen(false);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
    if (e.key === '+') handleZoomIn();
    if (e.key === '-') handleZoomOut();
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, handleKeyDown]);

  return (
    <>
      <button
        type="button"
        className="text-blue-500 hover:text-blue-700 transition-colors"
        title="Просмотр фото"
        onClick={handleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 inline"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5V7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5l5.25-5.25a2.25 2.25 0 013.18 0l5.25 5.25"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.25 9.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          />
        </svg>
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            bgcolor: 'transparent',
            overflow: 'hidden',
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <div className="absolute right-2 top-2 flex gap-2 z-10">
            <IconButton
              onClick={handleZoomIn}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <ZoomInIcon />
            </IconButton>
            <IconButton
              onClick={handleZoomOut}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <ZoomOutIcon />
            </IconButton>
            <IconButton
              onClick={handleClose}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-[80vh]"
          >
            <Image
              src={url}
              alt="Фото письма"
              fill
              className="object-contain transition-transform duration-200"
              style={{ transform: `scale(${scale})` }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};
