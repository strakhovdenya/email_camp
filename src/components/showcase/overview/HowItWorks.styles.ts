export const howItWorksStyles = {
  container: {
    mb: 8,
  },
  title: {
    mb: 2,
    fontWeight: 700,
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 600,
    mx: 'auto',
    textAlign: 'center',
    mb: 6,
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 2, md: 4 },
    maxWidth: { xs: '100%', md: 900 },
    mx: 'auto',
    position: 'relative',
    overflow: 'visible',
    px: { xs: 1, sm: 2 },
  },
  connectingLine: {
    position: 'absolute',
    left: '50%',
    top: 80,
    bottom: 80,
    width: 3,
    background: 'linear-gradient(180deg, #2563eb 0%, #7c3aed 50%, #059669 100%)',
    transform: 'translateX(-50%)',
    borderRadius: 1.5,
    zIndex: 0,
    display: { xs: 'none', md: 'block' },
  },
};
