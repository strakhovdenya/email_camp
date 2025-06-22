import { SxProps, Theme } from '@mui/material/styles';

// Title styles
export const titleStyles: SxProps<Theme> = {
  mb: { xs: 1, md: 4 },
  fontWeight: 700,
  textAlign: 'center',
  fontSize: { xs: '1rem', md: '2.125rem' },
  px: { xs: '2px', md: 0 },
  wordBreak: 'break-word',
};

// Paper styles
export const paperStyles: SxProps<Theme> = {
  p: { xs: '4px', md: 3 },
  mb: { xs: 1, md: 4 },
};

// Section title styles
export const sectionTitleStyles: SxProps<Theme> = {
  mb: { xs: 1, md: 2 },
  fontWeight: 700,
  fontSize: { xs: '1rem', md: '1.5rem' },
};

// Description styles
export const descriptionStyles: SxProps<Theme> = {
  mb: { xs: 1, md: 2 },
  fontSize: { xs: '0.8rem', md: '1rem' },
};

// Benefits container styles
export const benefitsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  flexWrap: 'wrap',
  mb: 2,
};

// DataSource structure container styles
export const structureContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: { xs: '4px', md: 4 },
  mb: { xs: 1, md: 4 },
  justifyContent: 'center',
  alignItems: { xs: 'stretch', md: 'flex-start' },
};

// Structure card styles
export const getStructureCardStyles = (color: string): SxProps<Theme> => ({
  p: { xs: '4px', md: 3 },
  minWidth: { xs: 0, md: 300 },
  background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
  border: `2px solid ${color}30`,
});

// Structure card title styles
export const getStructureCardTitleStyles = (color: string): SxProps<Theme> => ({
  fontWeight: 700,
  mb: { xs: 1, md: 2 },
  color,
  fontSize: { xs: '0.9rem', md: '1.25rem' },
});

// Structure card item styles
export const structureCardItemStyles: SxProps<Theme> = {
  mb: { xs: '2px', md: 1 },
  fontSize: { xs: '0.7rem', md: '0.875rem' },
  color: 'text.secondary',
};

// Syntax highlighter styles
export const syntaxHighlighterStyles = {
  borderRadius: 8,
  fontSize: '0.75rem',
  overflow: 'auto',
} as const;
