export const overviewCardStyles = {
  card: (color: string) => ({
    height: '100%',
    background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
    border: `1px solid ${color}30`,
  }),
  cardContent: {
    p: 3,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
  },
  avatar: (color: string) => ({
    bgcolor: color,
    mr: 2,
    width: 48,
    height: 48,
  }),
  title: {
    fontWeight: 700,
  },
  description: {
    mb: 3,
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
  },
  detailBullet: (color: string) => ({
    width: 6,
    height: 6,
    borderRadius: '50%',
    bgcolor: color,
    mr: 2,
  }),
};
