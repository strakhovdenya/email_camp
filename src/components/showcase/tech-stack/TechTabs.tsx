'use client';

import React, { useState } from 'react';
import { Paper, Tabs, Tab, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { TabPanel } from './TabPanel';
import { TechCard } from './TechCard';
import { getTechStackData } from './techStackData';
import { techTabsStyles } from './TechTabs.styles';
import { useLocale } from '@/contexts/LocaleContext';

export const TechTabs = () => {
  const [tabValue, setTabValue] = useState(0);
  const { t } = useLocale();

  const techStackData = React.useMemo(() => getTechStackData(t), [t]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderTechGrid = (techArray: typeof techStackData.frontend) => (
    <Box sx={techTabsStyles.techGrid}>
      {techArray.map((tech, index) => (
        <Box key={tech.title} sx={techTabsStyles.techItem}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TechCard tech={tech} />
          </motion.div>
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <Paper sx={techTabsStyles.tabsContainer}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered={false}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={techTabsStyles.tabs}
        >
          <Tab label={t('techStack.tabs.frontend')} />
          <Tab label={t('techStack.tabs.backend')} />
          <Tab label={t('techStack.tabs.devops')} />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        {renderTechGrid(techStackData.frontend)}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderTechGrid(techStackData.backend)}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {renderTechGrid(techStackData.devops)}
      </TabPanel>
    </>
  );
};
