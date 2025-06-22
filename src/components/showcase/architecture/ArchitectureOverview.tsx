import React from 'react';
import { Paper, Typography, Box, Card, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Storage as DatabaseIcon,
  Api as ApiIcon,
  Cloud as CloudIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import * as styles from './ArchitectureOverview.styles';

export function ArchitectureOverview() {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={styles.paperStyles}
    >
      <Typography variant="h4" sx={styles.titleStyles}>
        Общая архитектура
      </Typography>

      {/* Mobile version - Compact horizontal */}
      <Box sx={styles.mobileContainerStyles}>
        {[
          { label: 'Next.js', color: '#000000', icon: <CodeIcon /> },
          { label: 'API', color: '#2563eb', icon: <ApiIcon /> },
          { label: 'Supabase', color: '#3ecf8e', icon: <CloudIcon /> },
          { label: 'Postgres', color: '#336791', icon: <DatabaseIcon /> },
        ].map((item, index) => (
          <React.Fragment key={index}>
            <Box sx={styles.mobileItemBoxStyles}>
              <Avatar sx={styles.getMobileAvatarStyles(item.color)}>{item.icon}</Avatar>
              <Typography variant="caption" sx={styles.mobileLabelStyles}>
                {item.label}
              </Typography>
            </Box>
            {index < 3 && <Typography sx={styles.mobileArrowStyles}>→</Typography>}
          </React.Fragment>
        ))}
      </Box>

      {/* Desktop version */}
      <Box sx={styles.desktopContainerStyles}>
        {[
          { label: 'Next.js Frontend', color: '#000000', icon: <CodeIcon /> },
          { label: '↓', color: 'transparent' },
          { label: 'API Routes', color: '#2563eb', icon: <ApiIcon /> },
          { label: '↓', color: 'transparent' },
          { label: 'Supabase Client', color: '#3ecf8e', icon: <CloudIcon /> },
          { label: '↓', color: 'transparent' },
          { label: 'PostgreSQL', color: '#336791', icon: <DatabaseIcon /> },
        ].map((item, index) => (
          <Box key={index} sx={styles.desktopItemBoxStyles}>
            {item.color !== 'transparent' ? (
              <Card sx={styles.getDesktopCardStyles(item.color)}>
                <Avatar sx={styles.getDesktopAvatarStyles(item.color)}>{item.icon}</Avatar>
                <Typography variant="body2" sx={styles.desktopLabelStyles}>
                  {item.label}
                </Typography>
              </Card>
            ) : (
              <Typography variant="h4" color="text.secondary" sx={styles.desktopArrowStyles}>
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
