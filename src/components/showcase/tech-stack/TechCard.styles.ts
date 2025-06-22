export const techCardStyles = {
  card: (color: string) => ({
    height: '100%',
    background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
    border: `1px solid ${color}30`,
    overflow: 'hidden',
  }),
  cardContent: {
    p: { xs: '4px', md: 3 },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    mb: { xs: '4px', md: 2 },
  },
  avatar: (color: string) => ({
    bgcolor: color,
    mr: { xs: '4px', md: 2 },
    width: { xs: 24, md: 40 },
    height: { xs: 24, md: 40 },
  }),
  title: {
    fontWeight: 700,
    fontSize: { xs: '0.85rem', md: '1.25rem' },
  },
  versionChip: (color: string) => ({
    bgcolor: `${color}20`,
    fontSize: { xs: '0.6rem', md: '0.75rem' },
  }),
  description: {
    mb: { xs: '4px', md: 2 },
    fontSize: { xs: '0.7rem', md: '0.875rem' },
  },
  featuresContainer: {
    mb: { xs: '4px', md: 2 },
  },
  featureChip: {
    mr: { xs: '2px', md: 1 },
    mb: { xs: '2px', md: 1 },
    fontSize: { xs: '0.6rem', md: '0.75rem' },
  },
  accordion: {
    mt: { xs: '4px', md: 2 },
  },
  accordionTitle: {
    fontWeight: 600,
    fontSize: { xs: '0.7rem', md: '0.875rem' },
  },
};
