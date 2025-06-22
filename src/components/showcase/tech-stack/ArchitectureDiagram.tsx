import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { techStackData } from './techStackData';
import { architectureDiagramStyles } from './ArchitectureDiagram.styles';

export const ArchitectureDiagram = () => {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={architectureDiagramStyles.container}
    >
      <Typography variant="h4" sx={architectureDiagramStyles.title}>
        Архитектура системы
      </Typography>
      <Box sx={architectureDiagramStyles.diagramContainer}>
        {techStackData.architecture.map((item, index) => (
          <Chip key={index} label={item.label} sx={architectureDiagramStyles.chip(item.color)} />
        ))}
      </Box>
    </Paper>
  );
};
