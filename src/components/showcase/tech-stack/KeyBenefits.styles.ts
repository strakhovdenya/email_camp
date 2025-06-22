export const keyBenefitsStyles = {
  container: {
    mt: { xs: 1, md: 8 },
    textAlign: 'center',
    px: { xs: '4px', md: 0 },
  },
  title: {
    mb: { xs: 1, md: 4 },
    fontWeight: 700,
    fontSize: { xs: '1.2rem', md: '3rem' },
  },
  benefitsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: { xs: '4px', md: 4 },
    justifyContent: 'center',
  },
  benefitItem: {
    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 24px)' },
    minWidth: { xs: 0, md: 250 },
  },
  benefitCard: (color: string) => ({
    p: { xs: '4px', md: 3 },
    textAlign: 'center',
    height: '100%',
    background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
    border: `1px solid ${color}30`,
  }),
  benefitAvatar: (color: string) => ({
    bgcolor: color,
    width: { xs: 32, md: 56 },
    height: { xs: 32, md: 56 },
    mx: 'auto',
    mb: { xs: '4px', md: 2 },
  }),
  benefitTitle: {
    fontWeight: 700,
    mb: { xs: '2px', md: 1 },
    fontSize: { xs: '0.85rem', md: '1.25rem' },
  },
  benefitDescription: {
    fontSize: { xs: '0.7rem', md: '0.875rem' },
  },
};
