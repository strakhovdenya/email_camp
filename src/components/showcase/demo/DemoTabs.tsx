import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { demoTabsStyles } from './DemoTabs.styles';

interface TabLabel {
  full: string;
  short: string;
  active?: (room: string) => { full: string; short: string };
}

interface DemoTabsProps {
  activeTab: number;
  selectedRoom: string;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: Array<{ label: TabLabel }>;
}

export const DemoTabs = ({ activeTab, selectedRoom, onTabChange, tabs }: DemoTabsProps) => {
  const getTabLabel = (tabIndex: number) => {
    const tab = tabs[tabIndex];

    if (tab.label.active && activeTab === tabIndex && tabIndex > 0) {
      const activeLabels = tab.label.active(selectedRoom);
      return (
        <span>
          <span className="hidden sm:inline">{activeLabels.full}</span>
          <span className="sm:hidden">{activeLabels.short}</span>
        </span>
      );
    }

    return (
      <span>
        <span className="hidden sm:inline">{tab.label.full}</span>
        <span className="sm:hidden">{tab.label.short}</span>
      </span>
    );
  };

  return (
    <div className={demoTabsStyles.container}>
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        centered
        variant="fullWidth"
        sx={demoTabsStyles.tabs}
      >
        {tabs.map((_, index) => (
          <Tab key={index} label={getTabLabel(index)} />
        ))}
      </Tabs>
    </div>
  );
};
