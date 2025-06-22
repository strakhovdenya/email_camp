import React from 'react';
import Image from 'next/image';
import { Box, Typography, Card, Avatar, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Email as EmailIcon, Telegram as TelegramIcon } from '@mui/icons-material';
import { notificationExamplesStyles } from './NotificationExamples.styles';

export const NotificationExamples = () => {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8 }}
      sx={notificationExamplesStyles.paper}
    >
      <Typography variant="h5" sx={notificationExamplesStyles.title}>
        Примеры уведомлений
      </Typography>

      <Box sx={notificationExamplesStyles.notificationsGrid}>
        {/* Telegram notification */}
        <Card sx={notificationExamplesStyles.telegramCard}>
          <Box sx={notificationExamplesStyles.notificationHeader}>
            <Avatar
              sx={{
                ...notificationExamplesStyles.avatar,
                ...notificationExamplesStyles.telegramAvatar,
              }}
            >
              <TelegramIcon />
            </Avatar>
            <Typography variant="h6" sx={notificationExamplesStyles.notificationTitle}>
              Telegram уведомление
            </Typography>
          </Box>
          <Paper sx={notificationExamplesStyles.telegramMessage}>
            <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
              📬 <strong>Новое письмо в лагере!</strong>
              <br />
              Для: Иван Петров
              <br />
              Комната: 101
              <br />
              Время поступления: 14:30
              <br />
              <br />
              Заберите письмо на инфо-поинте! 📮
              <br />
              Ваше письмо готово к получению.
            </Typography>
          </Paper>
        </Card>

        {/* Email notification */}
        <Card sx={notificationExamplesStyles.emailCard}>
          <Box sx={notificationExamplesStyles.notificationHeader}>
            <Avatar
              sx={{
                ...notificationExamplesStyles.avatar,
                ...notificationExamplesStyles.emailAvatar,
              }}
            >
              <EmailIcon />
            </Avatar>
            <Typography variant="h6" sx={notificationExamplesStyles.notificationTitle}>
              Email уведомление
            </Typography>
          </Box>

          {/* Real Email Screenshot */}
          <Box sx={notificationExamplesStyles.emailScreenshot}>
            <Image
              src="/images/examples/email-notification.png"
              alt="Пример Email уведомления жителю лагеря"
              width={400}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={notificationExamplesStyles.emailCaption}
          >
            Реальный пример Email уведомления для жителя лагеря
          </Typography>
        </Card>
      </Box>
    </Paper>
  );
};
