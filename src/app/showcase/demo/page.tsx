'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { DataSourceProvider } from '@/providers/DataSourceProvider';
import {
  DemoHeader,
  DemoTabs,
  MockHomePage,
  MockAddLetterPage,
  MockDeliverPage,
  DemoFeatures,
  demoTheme,
  demoMockDataSource,
} from '@/components/showcase/demo';
import { getDemoData } from '@/components/showcase/demo/demoData';
import { useLocale } from '@/contexts/LocaleContext';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState('101');
  const { t } = useLocale();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddLetterClick = (roomNumber: string) => {
    setSelectedRoom(roomNumber);
    setActiveTab(1); // Переключаем на таб добавления
  };

  const handleDeliverClick = (roomNumber: string) => {
    setSelectedRoom(roomNumber);
    setActiveTab(2); // Переключаем на таб выдачи
  };

  const demoData = getDemoData(t);

  return (
    <div className="p-4 sm:p-6">
      <DemoHeader title={demoData.title} description={demoData.description} />

      <DemoTabs
        activeTab={activeTab}
        selectedRoom={selectedRoom}
        onTabChange={handleTabChange}
        tabs={demoData.tabs}
      />

      {/* Оборачиваем в DataSourceProvider с mock данными и дефолтной темой */}
      <ThemeProvider theme={demoTheme}>
        <DataSourceProvider type="mock" instance={demoMockDataSource}>
          {activeTab === 0 && (
            <MockHomePage
              onAddLetterClick={handleAddLetterClick}
              onDeliverClick={handleDeliverClick}
            />
          )}
          {activeTab === 1 && <MockAddLetterPage roomNumber={selectedRoom} />}
          {activeTab === 2 && <MockDeliverPage roomNumber={selectedRoom} />}
        </DataSourceProvider>
      </ThemeProvider>

      <DemoFeatures features={demoData.features} />
    </div>
  );
}
