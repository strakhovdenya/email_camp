import { SxProps, Theme } from '@mui/material/styles';

// Card styles
export const getCardStyles = (): SxProps<Theme> => ({
  height: '100%',
  width: '100%',
  position: 'relative',
  overflow: 'visible',
  display: 'flex',
  flexDirection: 'column',
});

// Card content styles
export const cardContentStyles: SxProps<Theme> = {
  p: { xs: 3, md: 4 },
};

// Header styles
export const headerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  mb: 3,
};

export const getAvatarStyles = (color: string): SxProps<Theme> => ({
  bgcolor: color,
  mr: 2,
  width: 56,
  height: 56,
  boxShadow: `0 4px 12px ${color}40`,
});

export const titleStyles: SxProps<Theme> = {
  fontWeight: 700,
  mb: 0.5,
};

export const descriptionStyles: SxProps<Theme> = {
  // Using default styles from MUI
};

// Benefits styles
export const getBenefitsContainerStyles = (hasStats: boolean): SxProps<Theme> => ({
  mb: hasStats ? 3 : 0,
});

export const benefitItemStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  mb: 1.5,
};

export const getBenefitIconStyles = (color: string): SxProps<Theme> => ({
  color: color,
  mr: 1.5,
  mt: 0.1,
  fontSize: 20,
});

export const benefitTextStyles: SxProps<Theme> = {
  fontSize: '0.95rem',
};

// Stats styles
export const statsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap',
};

export const getStatChipStyles = (color: string, statColor?: string): SxProps<Theme> => ({
  bgcolor: statColor || `${color}20`,
  color: statColor ? 'white' : color,
  fontWeight: 600,
  fontSize: '0.8rem',
});
