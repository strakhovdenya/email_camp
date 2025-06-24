export const featuresSectionStyles = {
  container: {
    py: { xs: 8, md: 12 },
    px: { xs: 2, md: 4 },
  },
  title: {
    mb: 2,
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  subtitle: {
    mb: 6,
    maxWidth: 600,
    mx: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)',
    },
    gap: 4,
    maxWidth: 1200,
    mx: 'auto',
  },
  gridItem: {
    display: 'flex',
  },
};
