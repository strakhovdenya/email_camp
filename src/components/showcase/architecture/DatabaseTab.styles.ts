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

// Tables container styles
export const tablesContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  flexWrap: { xs: 'nowrap', md: 'wrap' },
  gap: { xs: '4px', md: 4 },
  justifyContent: 'center',
  mb: { xs: 1, md: 6 },
  alignItems: { xs: 'stretch', md: 'flex-start' },
  px: { xs: '2px', md: 0 },
  overflow: 'hidden',
  width: '100%',
};

// Paper styles
export const paperStyles: SxProps<Theme> = {
  p: { xs: '4px', md: 3 },
  mb: { xs: 1, md: 4 },
};

export const lastPaperStyles: SxProps<Theme> = {
  p: { xs: '4px', md: 3 },
};

// Section title styles
export const sectionTitleStyles: SxProps<Theme> = {
  mb: { xs: 1, md: 2 },
  fontWeight: 700,
  fontSize: { xs: '1rem', md: '1.5rem' },
};

// Relationship styles
export const relationshipBoxStyles: SxProps<Theme> = {
  mb: { xs: 1, md: 3 },
};

export const relationshipTitleStyles: SxProps<Theme> = {
  mb: { xs: '2px', md: 1 },
  fontSize: { xs: '0.8rem', md: '1rem' },
};

export const relationshipDescriptionStyles: SxProps<Theme> = {
  ml: { xs: 1, md: 2 },
  fontSize: { xs: '0.7rem', md: '0.875rem' },
};

// Syntax highlighter styles
export const syntaxHighlighterStyles = {
  borderRadius: 8,
  fontSize: '0.65rem',
  overflow: 'auto',
  padding: '8px',
} as const;
