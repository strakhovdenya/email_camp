import { SxProps, Theme } from '@mui/material/styles';

// Outer container styles
export const outerContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  mb: { xs: 6, md: 8 },
};

// Inner container styles
export const innerContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: { xs: 2, md: 4 },
  maxWidth: '1200px',
  justifyContent: 'center',
  width: '100%',
};

// Feature item styles
export const featureItemStyles: SxProps<Theme> = {
  flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
  minWidth: { xs: 'auto', md: '300px' },
};
