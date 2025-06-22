import React from 'react';
import { Paper, Typography, Box, Card, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Storage as DatabaseIcon,
  Api as ApiIcon,
  Cloud as CloudIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

export function ArchitectureOverview() {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={{
        p: { xs: '6px 8px', sm: 2, md: 4 },
        mb: { xs: 1, md: 6 },
        mx: { xs: 0, sm: 0 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: '6px', md: 3 },
          fontWeight: 700,
          textAlign: 'center',
          fontSize: { xs: '0.9rem', md: '2.125rem' },
          px: { xs: 0, md: 0 },
          wordBreak: 'break-word',
        }}
      >
        Общая архитектура
      </Typography>

      {/* Mobile version - Compact horizontal */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'center',
          py: '4px',
          px: 0,
          gap: '4px',
        }}
      >
        {[
          { label: 'Next.js', color: '#000000', icon: <CodeIcon /> },
          { label: 'API', color: '#2563eb', icon: <ApiIcon /> },
          { label: 'Supabase', color: '#3ecf8e', icon: <CloudIcon /> },
          { label: 'Postgres', color: '#336791', icon: <DatabaseIcon /> },
        ].map((item, index) => (
          <React.Fragment key={index}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}
            >
              <Avatar
                sx={{
                  bgcolor: item.color,
                  width: 22,
                  height: 22,
                  mb: '1px',
                  '& .MuiSvgIcon-root': { fontSize: '0.8rem' },
                }}
              >
                {item.icon}
              </Avatar>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.55rem',
                  fontWeight: 500,
                  textAlign: 'center',
                  lineHeight: 1,
                  color: 'text.secondary',
                }}
              >
                {item.label}
              </Typography>
            </Box>
            {index < 3 && (
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  color: 'text.secondary',
                }}
              >
                →
              </Typography>
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Desktop version */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 3,
          mb: 4,
        }}
      >
        {[
          { label: 'Next.js Frontend', color: '#000000', icon: <CodeIcon /> },
          { label: '↓', color: 'transparent' },
          { label: 'API Routes', color: '#2563eb', icon: <ApiIcon /> },
          { label: '↓', color: 'transparent' },
          { label: 'Supabase Client', color: '#3ecf8e', icon: <CloudIcon /> },
          { label: '↓', color: 'transparent' },
          { label: 'PostgreSQL', color: '#336791', icon: <DatabaseIcon /> },
        ].map((item, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            {item.color !== 'transparent' ? (
              <Card
                sx={{
                  p: 2,
                  minWidth: 120,
                  background: `linear-gradient(135deg, ${item.color}10 0%, ${item.color}05 100%)`,
                  border: `1px solid ${item.color}40`,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: item.color,
                    mx: 'auto',
                    mb: 1,
                    width: 40,
                    height: 40,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  {item.label}
                </Typography>
              </Card>
            ) : (
              <Typography variant="h4" color="text.secondary" sx={{ fontSize: '2.125rem' }}>
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
