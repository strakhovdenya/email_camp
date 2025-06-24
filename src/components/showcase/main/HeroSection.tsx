import React from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import { PlayArrow as PlayIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { heroSectionStyles } from './HeroSection.styles';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  isVisible: boolean;
}

export const HeroSection = ({ title, subtitle, description, isVisible }: HeroSectionProps) => {
  return (
    <Box sx={heroSectionStyles.container}>
      {/* Animated background */}
      <Box
        component={motion.div}
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #2563eb20 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, #7c3aed20 0%, transparent 50%)',
            'radial-gradient(circle at 40% 50%, #059669 20 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        sx={heroSectionStyles.background}
      />

      <Fade in={isVisible} timeout={1000}>
        <Box>
          <Typography
            variant="h1"
            component={motion.h1}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={heroSectionStyles.title}
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            component={motion.h2}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={heroSectionStyles.subtitle}
          >
            {subtitle}
          </Typography>

          <Typography
            variant="h6"
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            sx={heroSectionStyles.description}
          >
            {description}
          </Typography>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            sx={heroSectionStyles.buttonContainer}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayIcon />}
              component={Link}
              href="/showcase/demo"
              sx={heroSectionStyles.primaryButton}
            >
              Попробовать демо
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              href="https://github.com/strakhovdenya/email_camp"
              target="_blank"
              sx={heroSectionStyles.secondaryButton}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};
