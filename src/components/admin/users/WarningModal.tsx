import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';

interface WarningModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ open, message, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-4xl mb-4"
          >
            ⚠️
          </motion.div>
          <DialogTitle sx={{ pb: 1 }}>
            <span className="text-xl font-semibold">Внимание</span>
          </DialogTitle>
          <div className="text-gray-700 mb-6">{message}</div>
        </motion.div>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {onConfirm ? (
          <>
            <Button
              variant="outlined"
              color="error"
              onClick={onConfirm}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
              }}
            >
              Удалить все письма и пользователя
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
              }}
            >
              Отмена
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
              },
            }}
          >
            Ок
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default WarningModal;
