export const notificationExamplesStyles = {
  paper: {
    p: 4,
    mt: 6,
    background: 'linear-gradient(135deg, #059669 10 0%, #2563eb10 100%)',
    border: '1px solid #05966930',
  },
  title: {
    mb: 3,
    fontWeight: 700,
    textAlign: 'center',
  },
  notificationsGrid: {
    display: 'flex',
    gap: { xs: 2, md: 4 },
    justifyContent: 'center',
    flexWrap: 'wrap',
    px: { xs: 1, sm: 0 },
  },
  telegramCard: {
    p: { xs: 2, md: 3 },
    maxWidth: { xs: '100%', sm: 350 },
    background: '#0088cc10',
    border: '1px solid #0088cc30',
    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '0 0 350px' },
  },
  emailCard: {
    p: { xs: 2, md: 3 },
    maxWidth: { xs: '100%', sm: 450 },
    background: '#dc262610',
    border: '1px solid #dc262630',
    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '0 0 450px' },
  },
  notificationHeader: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
    flexWrap: 'wrap',
  },
  avatar: {
    mr: 2,
    width: { xs: 40, md: 48 },
    height: { xs: 40, md: 48 },
  },
  telegramAvatar: {
    bgcolor: '#0088cc',
  },
  emailAvatar: {
    bgcolor: '#dc2626',
  },
  notificationTitle: {
    fontWeight: 700,
    fontSize: { xs: '1rem', md: '1.25rem' },
  },
  telegramMessage: {
    p: { xs: 1.5, md: 2 },
    bgcolor: '#f5f5f5',
    fontFamily: 'monospace',
    fontSize: { xs: '0.8rem', md: '0.875rem' },
  },
  emailScreenshot: {
    position: 'relative',
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid #e0e0e0',
  },
  emailCaption: {
    display: 'block',
    textAlign: 'center',
    mt: 2,
    fontStyle: 'italic',
  },
};
