import React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tech-tabpanel-${index}`}
      aria-labelledby={`tech-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: '4px', md: 3 }, overflow: 'hidden', width: '100%', minWidth: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
};
