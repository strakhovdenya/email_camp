import React from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { projectSummaryStyles } from './ProjectSummary.styles';

export const ProjectSummary = () => {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={projectSummaryStyles.paper}
    >
      <Typography variant="h4" sx={projectSummaryStyles.title}>
        О проекте
      </Typography>
      <Typography variant="body1" sx={projectSummaryStyles.text}>
        <strong>Email Camp</strong> — это цифровое решение для автоматизации процесса получения и
        выдачи почты в лагерях. Система устраняет необходимость ежедневного ручного поиска писем и
        обеспечивает мгновенные уведомления жителям лагеря.
      </Typography>
      <Typography variant="body1" sx={projectSummaryStyles.text}>
        <strong>Проблема:</strong> Каждый день после 14:00 множество людей приходят на инфо-поинт с
        вопросом &ldquo;Есть ли для меня письма?&rdquo;. Сотрудники вынуждены вручную проверять
        папки каждой комнаты, тратя время даже когда писем нет.
      </Typography>
      <Typography variant="body1" sx={projectSummaryStyles.lastText}>
        <strong>Решение:</strong> При поступлении почты сотрудник регистрирует письма в системе
        через QR-коды на папках комнат. Жители получают автоматические уведомления и приходят за
        почтой только тогда, когда она гарантированно есть.
      </Typography>
    </Paper>
  );
};
