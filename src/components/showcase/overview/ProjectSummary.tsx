import React from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { projectSummaryStyles } from './ProjectSummary.styles';
import { useLocale } from '@/contexts/LocaleContext';

export const ProjectSummary = () => {
  const { t } = useLocale();

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={projectSummaryStyles.paper}
    >
      <Typography variant="h4" sx={projectSummaryStyles.title}>
        {t('overview.projectSummary.title')}
      </Typography>
      <Typography variant="body1" sx={projectSummaryStyles.text}>
        {t('overview.projectSummary.description')}
      </Typography>
      <Typography variant="body1" sx={projectSummaryStyles.text}>
        {t('overview.projectSummary.problem')}
      </Typography>
      <Typography variant="body1" sx={projectSummaryStyles.lastText}>
        {t('overview.projectSummary.solution')}
      </Typography>
    </Paper>
  );
};
