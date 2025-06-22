import { SxProps, Theme } from '@mui/material/styles';

// Container styles
export const containerStyles: SxProps<Theme> = {
  py: { xs: 0.5, md: 4 },
  px: { xs: 0, sm: 1, md: 3 },
  width: '100%',
  maxWidth: { xs: '100vw', md: 'xl' },
};

// Header styles
export const headerBoxStyles: SxProps<Theme> = {
  textAlign: 'center',
  mb: { xs: 1, md: 6 },
  px: { xs: '4px', md: 0 },
  overflow: 'hidden',
  width: '100%',
};

export const titleStyles: SxProps<Theme> = {
  mb: { xs: 0.5, md: 2 },
  fontWeight: 800,
  fontSize: { xs: '1.3rem', sm: '2.5rem', md: '3.5rem' },
  wordBreak: 'break-word',
  hyphens: 'auto',
};

export const subtitleStyles: SxProps<Theme> = {
  maxWidth: '100%',
  mx: 'auto',
  px: { xs: '4px', sm: 0 },
  fontSize: { xs: '0.75rem', md: '1.25rem' },
  wordBreak: 'break-word',
  hyphens: 'auto',
  lineHeight: { xs: 1.2, md: 1.5 },
};

// Tabs styles
export const tabsPaperStyles: SxProps<Theme> = {
  mb: { xs: 1, md: 4 },
  mx: { xs: 0, sm: 0 },
  overflow: 'hidden',
};

export const tabsStyles: SxProps<Theme> = {
  '& .MuiTab-root': {
    fontWeight: 600,
    fontSize: { xs: '0.7rem', md: '1rem' },
    minWidth: { xs: 50, md: 160 },
    px: { xs: '4px', md: 3 },
    py: { xs: '4px', md: 1.5 },
  },
  '& .MuiTabs-indicator': {
    height: 3,
  },
  '& .MuiTabs-scrollButtons': {
    width: { xs: 24, md: 48 },
  },
  '& .MuiTabs-scroller': {
    overflow: 'auto !important',
  },
};

export const tabLabelBoxStyles: SxProps<Theme> = {
  display: { xs: 'block', md: 'block' },
  textAlign: 'center',
};

// API Tab styles
export const apiTitleStyles: SxProps<Theme> = {
  mb: { xs: 1, md: 4 },
  fontWeight: 700,
  textAlign: 'center',
  fontSize: { xs: '1rem', md: '2.125rem' },
  px: { xs: '2px', md: 0 },
  wordBreak: 'break-word',
};

export const apiEndpointCardStyles: SxProps<Theme> = {
  mb: { xs: '4px', md: 2 },
  p: { xs: '4px', md: 3 },
};

export const apiEndpointBoxStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: { xs: 'flex-start', md: 'center' },
  gap: { xs: '2px', md: 2 },
  flexDirection: { xs: 'column', sm: 'row' },
  flexWrap: 'wrap',
};

export const getMethodChipStyles = (method: string): SxProps<Theme> => ({
  bgcolor: method === 'GET' ? '#10b981' : method === 'POST' ? '#3b82f6' : '#f59e0b',
  color: 'white',
  fontWeight: 600,
  fontSize: { xs: '0.6rem', md: '0.75rem' },
  minWidth: { xs: 'auto', md: 60 },
});

export const apiPathStyles: SxProps<Theme> = {
  fontFamily: 'monospace',
  fontWeight: 600,
  fontSize: { xs: '0.7rem', md: '0.875rem' },
  flex: 1,
  minWidth: 0,
  wordBreak: 'break-all',
};

export const apiDescriptionStyles: SxProps<Theme> = {
  fontSize: { xs: '0.7rem', md: '0.875rem' },
  flex: { xs: 1, sm: 'auto' },
  minWidth: 0,
};

export const codeExamplePaperStyles: SxProps<Theme> = {
  p: { xs: 2, md: 3 },
};

export const codeExampleTitleStyles: SxProps<Theme> = {
  mb: 2,
  fontWeight: 700,
  fontSize: { xs: '1.25rem', md: '1.5rem' },
};

// Security Tab styles
export const securityGridStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' },
  gap: { xs: '4px', md: 2 },
  justifyContent: 'center',
  mb: { xs: 1, md: 8 },
  px: { xs: '2px', md: 0 },
  maxWidth: { md: '100%' },
};

export const getSecurityGridItemStyles = (index: number): SxProps<Theme> => ({
  gridColumn: { xs: '1', sm: index < 2 ? '1 / -1' : 'auto', md: 'auto' },
});

export const securityCardStyles: SxProps<Theme> = {
  p: { xs: '4px', md: 2 },
  textAlign: 'center',
  minHeight: { xs: 'auto', md: 200 },
  height: { xs: 'auto', md: '100%' },
};

export const securityIconStyles: SxProps<Theme> = {
  fontSize: { xs: '1.5rem', md: '2.5rem' },
  mb: { xs: '2px', md: 1 },
};

export const securityTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  mb: { xs: '2px', md: 1 },
  fontSize: { xs: '0.8rem', md: '1.25rem' },
};

export const securityDescriptionStyles: SxProps<Theme> = {
  mb: { xs: '4px', md: 2 },
  fontSize: { xs: '0.7rem', md: '0.875rem' },
};

export const securityChipStyles: SxProps<Theme> = {
  mr: { xs: '2px', md: 1 },
  mb: { xs: '2px', md: 1 },
  fontSize: { xs: '0.6rem', md: '0.75rem' },
};

// Metrics Tab styles
export const metricsGridStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
  gap: { xs: '4px', md: 2 },
  justifyContent: 'center',
  mb: { xs: 1, md: 8 },
  px: { xs: '2px', md: 0 },
  maxWidth: { md: '100%' },
};

export const getMetricCardStyles = (color: string): SxProps<Theme> => ({
  p: { xs: '4px', md: 2 },
  textAlign: 'center',
  minWidth: { xs: 0, md: 160 },
  minHeight: { xs: 'auto', md: 120 },
  height: { xs: 'auto', md: '100%' },
  background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
  border: `1px solid ${color}30`,
});

export const getMetricValueStyles = (color: string): SxProps<Theme> => ({
  fontWeight: 800,
  color: color,
  mb: { xs: '2px', md: 1 },
  fontSize: { xs: '0.9rem', sm: '1.75rem', md: '1.5rem' },
});

export const metricLabelStyles: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: { xs: '0.6rem', md: '0.875rem' },
  lineHeight: { xs: 1.1, md: 1.43 },
};

// Tech Features styles
export const techFeaturesBoxStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  flexWrap: { xs: 'nowrap', md: 'wrap' },
  gap: { xs: '4px', md: 4 },
  justifyContent: 'center',
  alignItems: { xs: 'center', md: 'stretch' },
  px: { xs: '2px', md: 0 },
};

export const techFeatureItemStyles: SxProps<Theme> = {
  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
  minWidth: { xs: 0, md: 280 },
  width: { xs: '100%', md: 'auto' },
  maxWidth: { xs: '100%', md: 'none' },
};

export const techFeatureCardStyles: SxProps<Theme> = {
  p: { xs: '4px', md: 3 },
  height: '100%',
};

export const techFeatureHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  mb: { xs: '4px', md: 2 },
  flexWrap: 'wrap',
};

export const techFeatureAvatarStyles: SxProps<Theme> = {
  bgcolor: 'primary.main',
  mr: { xs: '4px', md: 2 },
  width: { xs: 24, md: 40 },
  height: { xs: 24, md: 40 },
};

export const techFeatureTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: { xs: '0.85rem', md: '1.25rem' },
};

export const techFeatureChipStyles: SxProps<Theme> = {
  mr: { xs: '2px', md: 1 },
  mb: { xs: '2px', md: 1 },
  fontSize: { xs: '0.6rem', md: '0.75rem' },
};

// Common syntax highlighter styles
export const syntaxHighlighterStyles = {
  borderRadius: 8,
  fontSize: '0.75rem',
  overflow: 'auto',
} as const;
