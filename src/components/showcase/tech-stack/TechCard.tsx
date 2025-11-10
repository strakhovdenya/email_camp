'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TechItem } from './techStackData';
import { techCardStyles } from './TechCard.styles';
import { useLocale } from '@/contexts/LocaleContext';

interface TechCardProps {
  tech: TechItem;
}

export const TechCard = ({ tech }: TechCardProps) => {
  const { t } = useLocale();

  return (
    <Card sx={techCardStyles.card(tech.color)}>
      <CardContent sx={techCardStyles.cardContent}>
        <Box sx={techCardStyles.header}>
          <Avatar sx={techCardStyles.avatar(tech.color)}>{tech.icon}</Avatar>
          <Box>
            <Typography variant="h6" sx={techCardStyles.title}>
              {tech.title}
            </Typography>
            <Chip label={tech.version} size="small" sx={techCardStyles.versionChip(tech.color)} />
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={techCardStyles.description}>
          {tech.description}
        </Typography>

        <Box sx={techCardStyles.featuresContainer}>
          {tech.features.map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              size="small"
              variant="outlined"
              sx={techCardStyles.featureChip}
            />
          ))}
        </Box>

        {tech.codeExample && (
          <Accordion sx={techCardStyles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" sx={techCardStyles.accordionTitle}>
                {t('techStack.codeExample')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SyntaxHighlighter
                language="typescript"
                style={oneDark}
                customStyle={{ borderRadius: 8, fontSize: '0.65rem', padding: '8px' }}
              >
                {tech.codeExample}
              </SyntaxHighlighter>
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};
