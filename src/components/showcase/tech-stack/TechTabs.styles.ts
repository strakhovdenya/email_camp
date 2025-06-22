export const techTabsStyles = {
  tabsContainer: {
    mb: { xs: 1, md: 4 },
    overflow: 'hidden',
  },
  tabs: {
    '& .MuiTab-root': {
      fontWeight: 600,
      fontSize: { xs: '0.7rem', md: '1rem' },
      minWidth: { xs: 60, md: 'auto' },
      px: { xs: '8px', md: 3 },
    },
    '& .MuiTabs-scroller': {
      overflow: 'auto !important',
    },
  },
  techGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: { xs: '4px', md: 4 },
    justifyContent: 'center',
  },
  techItem: {
    flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
    minWidth: { xs: 0, md: 400 },
  },
};
