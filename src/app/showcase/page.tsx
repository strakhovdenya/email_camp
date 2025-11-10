'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  TechStackSection,
} from '@/components/showcase/main';
import { getShowcaseData } from '@/components/showcase/main/showcaseData';
import { useLocale } from '@/contexts/LocaleContext';

export default function ShowcasePage() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const showcaseData = getShowcaseData(t);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <HeroSection
        title={showcaseData.hero.title}
        subtitle={showcaseData.hero.subtitle}
        description={showcaseData.hero.description}
        isVisible={isVisible}
      />

      <StatsSection stats={showcaseData.stats} isVisible={isVisible} />

      <FeaturesSection features={showcaseData.features} />

      <TechStackSection techStack={showcaseData.techStack} />
    </Container>
  );
}
