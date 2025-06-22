import React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`arch-tabpanel-${index}`}
      aria-labelledby={`arch-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: '2px', md: 3 }, overflow: 'hidden', width: '100%', minWidth: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
