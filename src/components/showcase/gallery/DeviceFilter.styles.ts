export const deviceFilterStyles = {
  container: {
    display: 'flex',
    gap: { xs: 0.5, md: 0.5 },
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  mobileButton: {
    minWidth: 70,
    px: 1,
    py: 0.5,
    fontSize: '0.65rem',
    '& .MuiButton-startIcon': {
      marginRight: '4px',
      '& svg': {
        fontSize: '0.9rem',
      },
    },
  },
  mobileButtonContent: {
    textAlign: 'center',
  },
  mobileButtonLabel: {
    fontWeight: 600,
    fontSize: '0.65rem',
  },
  mobileButtonCount: {
    fontSize: '0.55rem',
    opacity: 0.8,
  },
  desktopCard: {
    cursor: 'pointer',
    minWidth: 85,
    maxWidth: 95,
    transition: 'all 0.3s ease',
    borderRadius: 2,
  },
  desktopCardContent: {
    textAlign: 'center',
    p: 1,
    '&:last-child': {
      pb: 1,
    },
  },
  desktopCardLabel: {
    fontWeight: 600,
    fontSize: '0.7rem',
    mb: 0.3,
    lineHeight: 1.1,
  },
  desktopCardCount: {
    fontSize: '0.6rem',
    opacity: 0.7,
  },
};
