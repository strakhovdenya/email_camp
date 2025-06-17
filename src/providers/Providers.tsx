'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/providers/ToastProvider';
import { DataSourceProvider } from '@/providers/DataSourceProvider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <DataSourceProvider type="supabase">
      <ToastProvider>{children}</ToastProvider>
      </DataSourceProvider>
    </QueryClientProvider>
  );
}
