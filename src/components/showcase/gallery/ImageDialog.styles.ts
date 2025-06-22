export const imageDialogStyles = {
  dialog: {
    '& .MuiDialog-paper': {
      maxHeight: '90vh',
    },
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 700,
  },
  dialogContent: {
    p: 0,
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain' as const,
  },
  dialogActions: {
    p: 2,
  },
  description: {
    flex: 1,
  },
};
