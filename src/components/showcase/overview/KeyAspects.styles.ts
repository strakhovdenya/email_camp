export const keyAspectsStyles = {
  container: {
    mb: 8,
  },
  title: {
    mb: 4,
    fontWeight: 700,
    textAlign: 'center',
  },
  aspectsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: { xs: 2, md: 4 },
    justifyContent: 'center',
    px: { xs: 1, sm: 0 },
  },
  aspectItem: {
    flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' },
    minWidth: { xs: 'auto', md: 300 },
    maxWidth: { xs: '100%', md: 400 },
  },
};
