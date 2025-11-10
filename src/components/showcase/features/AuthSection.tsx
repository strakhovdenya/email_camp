import React from 'react';
import { Typography, Box, Paper, Card, Avatar, Chip, useTheme } from '@mui/material';
import {
  Email as EmailIcon,
  AdminPanelSettings as AdminIcon,
  CheckCircle as CheckIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocale } from '@/contexts/LocaleContext';

export function AuthSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useLocale();

  const authMethods = [
    {
      title: t('features.authSection.authMethods.emailRegistration.title'),
      description: t('features.authSection.authMethods.emailRegistration.description'),
      icon: <EmailIcon />,
      color: '#3b82f6',
      steps: [
        t('features.authSection.authMethods.emailRegistration.steps.0'),
        t('features.authSection.authMethods.emailRegistration.steps.1'),
        t('features.authSection.authMethods.emailRegistration.steps.2'),
        t('features.authSection.authMethods.emailRegistration.steps.3'),
      ],
    },
    {
      title: t('features.authSection.authMethods.googleOAuth.title'),
      description: t('features.authSection.authMethods.googleOAuth.description'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      ),
      color: '#059669',
      steps: [
        t('features.authSection.authMethods.googleOAuth.steps.0'),
        t('features.authSection.authMethods.googleOAuth.steps.1'),
        t('features.authSection.authMethods.googleOAuth.steps.2'),
        t('features.authSection.authMethods.googleOAuth.steps.3'),
      ],
    },
  ];

  const securityFeatures = [
    {
      icon: <AdminIcon />,
      title: t('features.authSection.securityFeatures.firstAdmin.title'),
      description: t('features.authSection.securityFeatures.firstAdmin.description'),
      color: '#dc2626',
    },
    {
      icon: <CheckIcon />,
      title: t('features.authSection.securityFeatures.controlledRegistration.title'),
      description: t('features.authSection.securityFeatures.controlledRegistration.description'),
      color: '#7c3aed',
    },
    {
      icon: <DashboardIcon />,
      title: t('features.authSection.securityFeatures.rolesAndRights.title'),
      description: t('features.authSection.securityFeatures.rolesAndRights.description'),
      color: '#2563eb',
    },
    {
      icon: <CheckIcon />,
      title: t('features.authSection.securityFeatures.middlewareProtection.title'),
      description: t('features.authSection.securityFeatures.middlewareProtection.description'),
      color: '#059669',
    },
  ];

  const techStack = [
    { label: t('features.authSection.technicalImplementation.techStack.0'), color: '#059669' },
    { label: t('features.authSection.technicalImplementation.techStack.1'), color: '#2563eb' },
    { label: t('features.authSection.technicalImplementation.techStack.2'), color: '#7c3aed' },
    { label: t('features.authSection.technicalImplementation.techStack.3'), color: '#dc2626' },
    { label: t('features.authSection.technicalImplementation.techStack.4'), color: '#ea580c' },
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 6, md: 8 } }}>
      <Paper
        sx={{
          p: { xs: 3, md: 6 },
          maxWidth: '1200px',
          width: '100%',
          bgcolor: isDark ? 'grey.900' : 'background.paper',
          border: `1px solid ${isDark ? 'grey.700' : '#cbd5e1'}`,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: { xs: 3, md: 5 },
            fontWeight: 700,
            textAlign: 'center',
            fontSize: { xs: '1.8rem', md: '2.5rem' },
          }}
        >
          {t('features.authSection.title')}
        </Typography>

        {/* Auth Methods */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 3, md: 4 },
              maxWidth: '1000px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {authMethods.map((method, index) => (
              <Box
                key={index}
                sx={{
                  flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                  minWidth: { xs: 'auto', md: '300px' },
                }}
              >
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: isDark ? 'grey.800' : 'background.paper',
                    border: `2px solid ${method.color}${isDark ? '60' : '30'}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: method.color, mr: 2, width: 48, height: 48 }}>
                      {method.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {method.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {method.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pl: 1 }}>
                    {method.steps.map((step, stepIndex) => (
                      <Box key={stepIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            bgcolor: method.color,
                            borderRadius: '50%',
                            mr: 1.5,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body2">{step}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Security Features */}
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          {t('features.authSection.securityFeatures.title')}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, md: 3 },
              maxWidth: '1000px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {securityFeatures.map((feature, index) => (
              <Box
                sx={{
                  flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                  minWidth: { xs: 'auto', md: '300px' },
                }}
                key={index}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: isDark ? 'grey.800' : 'background.paper',
                      border: `1px solid ${feature.color}${isDark ? '60' : '30'}`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: feature.color,
                          mr: 2,
                          width: 40,
                          height: 40,
                          mt: 0.5,
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Technical Implementation */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
            {t('features.authSection.technicalImplementation.title')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
            {techStack.map((tech, index) => (
              <Chip
                key={index}
                label={tech.label}
                sx={{
                  bgcolor: `${tech.color}20`,
                  color: tech.color,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  px: 1,
                  py: 0.5,
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
