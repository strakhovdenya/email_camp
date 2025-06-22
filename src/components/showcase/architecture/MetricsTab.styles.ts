export const metricsTabStyles = {
  title: {
    mb: { xs: 1, md: 4 },
    fontWeight: 700,
    textAlign: 'center',
    fontSize: { xs: '1rem', md: '2.125rem' },
    px: { xs: '2px', md: 0 },
    wordBreak: 'break-word',
  },

  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
    gap: { xs: '4px', md: 4 },
    mb: { xs: 1, md: 6 },
  },

  metricCard: (color: string) => ({
    p: { xs: '4px', md: 3 },
    textAlign: 'center',
    background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`,
    border: `1px solid ${color}`,
    borderRadius: 2,
    height: '100%',
  }),

  metricValue: (color: string) => ({
    fontWeight: 700,
    color: color,
    mb: { xs: '2px', md: 1 },
    fontSize: { xs: '1.2rem', md: '2rem' },
  }),

  metricLabel: {
    fontSize: { xs: '0.7rem', md: '0.875rem' },
    fontWeight: 500,
  },

  techGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
    gap: { xs: '4px', md: 4 },
  },

  techCard: {
    p: { xs: '4px', md: 3 },
    height: '100%',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    border: '1px solid #e2e8f0',
  },

  techHeader: {
    display: 'flex',
    alignItems: 'center',
    mb: { xs: '4px', md: 2 },
  },

  techAvatar: {
    width: { xs: 32, md: 48 },
    height: { xs: 32, md: 48 },
    mr: { xs: 1, md: 2 },
    bgcolor: 'primary.main',
  },

  techTitle: {
    fontWeight: 700,
    fontSize: { xs: '0.9rem', md: '1.25rem' },
  },

  techChip: {
    m: { xs: '1px', md: 0.5 },
    fontSize: { xs: '0.6rem', md: '0.75rem' },
  },
};
