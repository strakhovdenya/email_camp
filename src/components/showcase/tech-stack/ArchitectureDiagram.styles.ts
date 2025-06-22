export const architectureDiagramStyles = {
  container: {
    p: { xs: '4px', md: 4 },
    mb: { xs: 1, md: 6 },
    textAlign: 'center',
  },
  title: {
    mb: { xs: 1, md: 3 },
    fontWeight: 700,
    fontSize: { xs: '1rem', md: '2.125rem' },
  },
  diagramContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: { xs: '4px', md: 3 },
  },
  chip: (color: string) => ({
    bgcolor: color !== 'transparent' ? `${color}20` : 'transparent',
    color: color !== 'transparent' ? color : 'text.secondary',
    fontWeight: 600,
    fontSize: { xs: '0.65rem', md: '1rem' },
    py: { xs: '2px', md: 2 },
    px: color === 'transparent' ? 0 : { xs: '4px', md: 2 },
    border: color !== 'transparent' ? `1px solid ${color}40` : 'none',
  }),
};
