import { SxProps, Theme } from '@mui/material/styles';

// Main container styles
export const paperStyles: SxProps<Theme> = {
  p: { xs: '6px 8px', sm: 2, md: 4 },
  mb: { xs: 1, md: 6 },
  mx: { xs: 0, sm: 0 },
};

// Title styles
export const titleStyles: SxProps<Theme> = {
  mb: { xs: '6px', md: 3 },
  fontWeight: 700,
  textAlign: 'center',
  fontSize: { xs: '0.9rem', md: '2.125rem' },
  px: { xs: 0, md: 0 },
  wordBreak: 'break-word',
};

// Mobile version styles
export const mobileContainerStyles: SxProps<Theme> = {
  display: { xs: 'flex', md: 'none' },
  alignItems: 'center',
  justifyContent: 'center',
  py: '4px',
  px: 0,
  gap: '4px',
};

export const mobileItemBoxStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 0,
};

export const getMobileAvatarStyles = (color: string): SxProps<Theme> => ({
  bgcolor: color,
  width: 22,
  height: 22,
  mb: '1px',
  '& .MuiSvgIcon-root': { fontSize: '0.8rem' },
});

export const mobileLabelStyles: SxProps<Theme> = {
  fontSize: '0.55rem',
  fontWeight: 500,
  textAlign: 'center',
  lineHeight: 1,
  color: 'text.secondary',
};

export const mobileArrowStyles: SxProps<Theme> = {
  fontSize: '0.8rem',
  color: 'text.secondary',
};

// Desktop version styles
export const desktopContainerStyles: SxProps<Theme> = {
  display: { xs: 'none', md: 'flex' },
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 3,
  mb: 4,
};

export const desktopItemBoxStyles: SxProps<Theme> = {
  textAlign: 'center',
};

export const getDesktopCardStyles = (color: string): SxProps<Theme> => ({
  p: 2,
  minWidth: 120,
  background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
  border: `1px solid ${color}40`,
});

export const getDesktopAvatarStyles = (color: string): SxProps<Theme> => ({
  bgcolor: color,
  mx: 'auto',
  mb: 1,
  width: 40,
  height: 40,
});

export const desktopLabelStyles: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: '0.875rem',
};

export const desktopArrowStyles: SxProps<Theme> = {
  fontSize: '2.125rem',
};
