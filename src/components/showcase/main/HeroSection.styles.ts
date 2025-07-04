export const heroSectionStyles = {
  container: {
    textAlign: 'center',
    py: { xs: 8, md: 12 },
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  title: {
    mb: 2,
    fontWeight: 800,
    fontSize: { xs: '2.5rem', md: '4rem' },
    background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    mb: 3,
    fontWeight: 600,
    color: 'text.primary',
    fontSize: { xs: '1.5rem', md: '2rem' },
  },
  description: {
    mb: 4,
    color: 'text.secondary',
    maxWidth: 800,
    mx: 'auto',
    lineHeight: 1.6,
    fontSize: { xs: '1rem', md: '1.25rem' },
  },
  buttonContainer: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
    px: 4,
    py: 1.5,
    fontSize: '1.1rem',
  },
  secondaryButton: {
    px: 4,
    py: 1.5,
    fontSize: '1.1rem',
  },
};
