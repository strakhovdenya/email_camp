export const galleryCardStyles = {
  card: {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    },
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 1,
    },
  },
  zoomButton: {
    color: 'white',
  },
  title: {
    fontWeight: 700,
    mb: 1,
  },
  description: {
    mb: 2,
  },
  tagsContainer: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
  },
};
