import { SxProps, Theme } from '@mui/material/styles';

// Outer container styles
export const outerContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  mb: { xs: 6, md: 8 },
};

// Paper styles
export const paperStyles: SxProps<Theme> = {
  p: { xs: 3, md: 6 },
  maxWidth: '1200px',
  width: '100%',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  border: '1px solid #cbd5e1',
};

// Main title styles
export const mainTitleStyles: SxProps<Theme> = {
  mb: { xs: 3, md: 5 },
  fontWeight: 700,
  textAlign: 'center',
  fontSize: { xs: '1.8rem', md: '2.5rem' },
};

// Section container styles
export const sectionContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  mb: { xs: 4, md: 6 },
};

// Auth methods container styles
export const authMethodsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: { xs: 3, md: 4 },
  maxWidth: '1000px',
  justifyContent: 'center',
  width: '100%',
};

// Auth method item styles
export const authMethodItemStyles: SxProps<Theme> = {
  flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
  minWidth: { xs: 'auto', md: '300px' },
};

// Auth card styles
export const getAuthCardStyles = (color: string): SxProps<Theme> => ({
  p: 3,
  height: '100%',
  background: `linear-gradient(135deg, ${color}15 0%, ${color}10 100%)`,
  border: `2px solid ${color}30`,
});

// Auth header styles
export const authHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  mb: 3,
};

// Auth avatar styles
export const getAuthAvatarStyles = (color: string): SxProps<Theme> => ({
  bgcolor: color,
  mr: 2,
  width: 48,
  height: 48,
});

// Auth title styles
export const authTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
};

// Steps container styles
export const stepsContainerStyles: SxProps<Theme> = {
  pl: 1,
};

// Step item styles
export const stepItemStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  mb: 1.5,
};

// Step bullet styles
export const getStepBulletStyles = (color: string): SxProps<Theme> => ({
  width: 6,
  height: 6,
  bgcolor: color,
  borderRadius: '50%',
  mr: 1.5,
  flexShrink: 0,
});

// Section title styles
export const sectionTitleStyles: SxProps<Theme> = {
  mb: 3,
  fontWeight: 700,
  textAlign: 'center',
  fontSize: { xs: '1.5rem', md: '2rem' },
};

// Security features container styles
export const securityFeaturesContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: { xs: 2, md: 3 },
  maxWidth: '1000px',
  justifyContent: 'center',
  width: '100%',
};

// Security feature item styles
export const securityFeatureItemStyles: SxProps<Theme> = {
  flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
  minWidth: { xs: 'auto', md: '300px' },
};

// Security card styles
export const getSecurityCardStyles = (color: string): SxProps<Theme> => ({
  p: 3,
  height: '100%',
  background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
  border: `1px solid ${color}30`,
});

// Security header styles
export const securityHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  mb: 2,
};

// Security avatar styles
export const getSecurityAvatarStyles = (color: string): SxProps<Theme> => ({
  bgcolor: color,
  mr: 2,
  width: 40,
  height: 40,
  mt: 0.5,
});

// Security title styles
export const securityTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  mb: 1,
};

// Tech implementation styles
export const techImplementationStyles: SxProps<Theme> = {
  textAlign: 'center',
};

export const techTitleStyles: SxProps<Theme> = {
  mb: 2,
  fontWeight: 700,
  color: 'text.primary',
};

export const techChipsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 2,
};

export const getTechChipStyles = (color: string): SxProps<Theme> => ({
  bgcolor: `${color}20`,
  color: color,
  fontWeight: 600,
  fontSize: '0.9rem',
  px: 1,
  py: 0.5,
});
