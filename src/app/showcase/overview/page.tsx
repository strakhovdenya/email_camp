'use client';

import React from 'react';
import { Container } from '@mui/material';
import {
  OverviewHeader,
  ProjectSummary,
  KeyAspects,
  HowItWorks,
  NotificationExamples,
} from '@/components/showcase/overview';

export default function OverviewPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
      <OverviewHeader />
      <ProjectSummary />
      <KeyAspects />
      <HowItWorks />
      <NotificationExamples />
    </Container>
  );
}
