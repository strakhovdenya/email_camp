export const statsSectionStyles = {
  container: {
    py: { xs: 6, md: 8 },
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'center',
  },
  gridItem: {
    flex: { xs: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 24px)' },
    minWidth: 200,
  },
  card: {
    textAlign: 'center',
    p: 3,
    backdropFilter: 'blur(10px)',
    border: '1px solid',
  },
  value: {
    fontWeight: 800,
    background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  label: {
    fontWeight: 600,
  },
};
