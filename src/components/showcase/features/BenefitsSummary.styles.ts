import { SxProps, Theme } from '@mui/material/styles';

// Container styles
export const containerStyles: SxProps<Theme> = {
  textAlign: 'center',
  mb: { xs: 4, md: 6 },
};

// Title styles
export const titleStyles: SxProps<Theme> = {
  mb: { xs: 3, md: 4 },
  fontWeight: 700,
  fontSize: { xs: '1.8rem', md: '2.5rem' },
};

// Outer benefits container styles
export const outerBenefitsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
};

// Inner benefits container styles
export const innerBenefitsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: { xs: 2, md: 3 },
  maxWidth: '1000px',
  justifyContent: 'center',
  width: '100%',
};

// Benefit item styles
export const benefitItemStyles: SxProps<Theme> = {
  flex: { xs: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' },
  minWidth: { xs: '140px', md: '200px' },
};

// Benefit card styles
export const getBenefitCardStyles = (color: string): SxProps<Theme> => ({
  p: 3,
  textAlign: 'center',
  height: '100%',
  background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
  border: `1px solid ${color}30`,
});

// Benefit avatar styles
export const getBenefitAvatarStyles = (color: string): SxProps<Theme> => ({
  bgcolor: color,
  mx: 'auto',
  mb: 2,
  width: 56,
  height: 56,
});

// Benefit title styles
export const benefitTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  mb: 1,
};
