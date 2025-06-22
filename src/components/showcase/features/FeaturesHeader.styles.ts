import { SxProps, Theme } from '@mui/material/styles';

// Container styles
export const containerStyles: SxProps<Theme> = {
  textAlign: 'center',
  mb: { xs: 4, md: 6 },
};

// Title styles
export const titleStyles: SxProps<Theme> = {
  mb: 2,
  fontWeight: 800,
  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
};

// Subtitle styles
export const subtitleStyles: SxProps<Theme> = {
  maxWidth: 800,
  mx: 'auto',
  px: { xs: 2, sm: 0 },
  fontSize: { xs: '1rem', md: '1.25rem' },
};
