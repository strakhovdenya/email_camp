export const featureCardStyles = {
  card: {
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-8px)',
    },
  },
  content: {
    p: 3,
    textAlign: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    mx: 'auto',
    mb: 2,
  },
  title: {
    fontWeight: 700,
  },
};
