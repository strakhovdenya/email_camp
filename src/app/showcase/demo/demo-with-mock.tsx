'use client';

import { DataSourceProvider } from '@/providers/DataSourceProvider';
import DemoPage from './page';

// Версия demo страницы, которая принудительно использует mock данные
export default function DemoWithMockPage() {
  return (
    <DataSourceProvider type="mock">
      <DemoPage />
    </DataSourceProvider>
  );
} 
 
 
 