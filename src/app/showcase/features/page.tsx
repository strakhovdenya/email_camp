'use client';

import React from 'react';
import { Container } from '@mui/material';
import {
  FeaturesHeader,
  MainFeatures,
  AuthSection,
  BenefitsSummary,
} from '@/components/showcase/features';

export default function FeaturesPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
      <FeaturesHeader />
      <MainFeatures />
      <AuthSection />
      <BenefitsSummary />
    </Container>
  );
}
