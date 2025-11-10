import { SxProps, Theme } from '@mui/material/styles';

// Outer container styles
export const outerContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  mb: { xs: 6, md: 8 },
};

// Inner container styles
export const innerContainerStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    md: 'repeat(2, 1fr)',
  },
  gap: { xs: 2, md: 4 },
  maxWidth: '1200px',
  width: '100%',
};

// Feature item styles
export const featureItemStyles: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
};
