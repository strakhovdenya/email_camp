'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography, Card, Avatar, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Email as EmailIcon, Telegram as TelegramIcon } from '@mui/icons-material';
import { notificationExamplesStyles } from './NotificationExamples.styles';
import { useLocale } from '@/contexts/LocaleContext';

export const NotificationExamples = () => {
  const { t } = useLocale();

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8 }}
      sx={notificationExamplesStyles.paper}
    >
      <Typography variant="h5" sx={notificationExamplesStyles.title}>
        {t('overview.notificationExamples.title')}
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
              {t('overview.notificationExamples.telegram.title')}
            </Typography>
          </Box>
          <Paper sx={notificationExamplesStyles.telegramMessage}>
            <Typography
              variant="body2"
              sx={{ fontSize: 'inherit' }}
              dangerouslySetInnerHTML={{
                __html: t('overview.notificationExamples.telegram.message').replace(
                  /\n/g,
                  '<br />'
                ),
              }}
            />
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
              {t('overview.notificationExamples.email.title')}
            </Typography>
          </Box>

          {/* Real Email Screenshot */}
          <Box sx={notificationExamplesStyles.emailScreenshot}>
            <Image
              src="/images/examples/email-notification.png"
              alt={t('overview.notificationExamples.email.alt')}
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
            {t('overview.notificationExamples.email.caption')}
          </Typography>
        </Card>
      </Box>
    </Paper>
  );
};
