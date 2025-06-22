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

export default function ArchitecturePage() {
  const [tabValue, setTabValue] = useState(0);

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
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>База данных</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>БД</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>API Структура</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>API</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>DataSource</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>DS</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>Безопасность</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>Защита</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={styles.tabLabelBoxStyles}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>Метрики</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>Метрики</Box>
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
