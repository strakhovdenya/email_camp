'use client';

import React, { useState } from 'react';
import { Container, Box, Paper, Tab, Tabs } from '@mui/material';
import {
  TabPanel,
  ArchitectureOverview,
  DatabaseTab,
  DataSourceTab,
  ArchitectureHeader,
  ApiTab,
  SecurityTab,
  MetricsTab,
} from '@/components/showcase/architecture';
import * as styles from './styles';
import { useLocale } from '@/contexts/LocaleContext';

export default function ArchitecturePage() {
  const [tabValue, setTabValue] = useState(0);
  const { t } = useLocale();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={styles.containerStyles}>
      {/* Header */}
      <ArchitectureHeader />

      {/* Architecture Overview */}
      <ArchitectureOverview />

      {/* Tabs */}
      <Paper sx={styles.tabsPaperStyles}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered={false}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={styles.tabsStyles}
        >
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {t('architecture.tabs.database.full')}
                </Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  {t('architecture.tabs.database.short')}
                </Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {t('architecture.tabs.api.full')}
                </Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  {t('architecture.tabs.api.short')}
                </Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {t('architecture.tabs.datasource.full')}
                </Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  {t('architecture.tabs.datasource.short')}
                </Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {t('architecture.tabs.security.full')}
                </Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  {t('architecture.tabs.security.short')}
                </Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {t('architecture.tabs.metrics.full')}
                </Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  {t('architecture.tabs.metrics.short')}
                </Box>
              </Box>
            }
          />
        </Tabs>
      </Paper>

      {/* Database Schema */}
      <TabPanel value={tabValue} index={0}>
        <DatabaseTab />
      </TabPanel>

      {/* API Structure */}
      <TabPanel value={tabValue} index={1}>
        <ApiTab />
      </TabPanel>

      {/* DataSource Architecture */}
      <TabPanel value={tabValue} index={2}>
        <DataSourceTab />
      </TabPanel>

      {/* Security */}
      <TabPanel value={tabValue} index={3}>
        <SecurityTab />
      </TabPanel>

      {/* Metrics */}
      <TabPanel value={tabValue} index={4}>
        <MetricsTab />
      </TabPanel>
    </Container>
  );
}
