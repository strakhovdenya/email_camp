'use client';

import React from 'react';
import { Container } from '@mui/material';
import {
  TechStackHeader,
  ArchitectureDiagram,
  TechTabs,
  KeyBenefits,
} from '@/components/showcase/tech-stack';

export default function TechStackPage() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 0.5, md: 4 },
        px: { xs: 0, sm: 1, md: 3 },
        width: '100%',
        maxWidth: { xs: '100vw', md: 'xl' },
      }}
    >
      <TechStackHeader />
      <ArchitectureDiagram />
      <TechTabs />
      <KeyBenefits />
    </Container>
  );
}
