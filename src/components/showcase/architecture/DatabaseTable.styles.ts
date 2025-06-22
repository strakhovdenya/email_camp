import { SxProps, Theme } from '@mui/material/styles';

// Card styles
export const getCardStyles = (color: string): SxProps<Theme> => ({
  minWidth: 0,
  width: '100%',
  maxWidth: '100%',
  background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
  border: `2px solid ${color}30`,
  overflow: 'hidden',
});

// Card content styles
export const cardContentStyles: SxProps<Theme> = {
  p: { xs: '4px', md: 2 },
};

// Table name styles
export const getTableNameStyles = (color: string): SxProps<Theme> => ({
  fontWeight: 700,
  mb: { xs: '4px', md: 1 },
  color,
  fontSize: { xs: '0.85rem', md: '1.25rem' },
  wordBreak: 'break-word',
});

// Column row styles
export const columnRowStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  mb: { xs: '2px', md: 1 },
  flexWrap: 'nowrap',
};

// Column name styles
export const getColumnNameStyles = (isKey: boolean, isForeign: boolean): SxProps<Theme> => ({
  fontWeight: isKey ? 700 : 400,
  color: isKey ? 'primary.main' : isForeign ? 'secondary.main' : 'text.primary',
  fontSize: { xs: '0.7rem', md: '0.875rem' },
  minWidth: 0,
  flex: 1,
  mr: { xs: '2px', md: 1 },
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

// Column type styles
export const columnTypeStyles: SxProps<Theme> = {
  fontSize: { xs: '0.65rem', md: '0.75rem' },
  flexShrink: 0,
  whiteSpace: 'nowrap',
};
