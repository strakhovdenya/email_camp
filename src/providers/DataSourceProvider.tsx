'use client';

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import type { IDataSource } from '@/datasources/interfaces/IDataSource';
import type { DataSourceType } from '@/config/datasource';
import { SupabaseDataSource } from '@/datasources/supabase/SupabaseDataSource';
import { MockDataSource } from '@/datasources/mock/MockDataSource';

interface DataSourceContextType {
  dataSource: IDataSource;
  currentType: DataSourceType;
}

const DataSourceContext = createContext<DataSourceContextType | null>(null);

interface DataSourceProviderProps {
  children: ReactNode;
  type: DataSourceType;
}

export function DataSourceProvider({ children, type }: DataSourceProviderProps) {
  const dataSource = useMemo(() => {
    switch (type) {
      case 'supabase':
        return new SupabaseDataSource();
      case 'mock':
        return new MockDataSource();
      case 'postgresql':
        throw new Error('PostgreSQL DataSource not implemented yet');
      case 'mysql':
        throw new Error('MySQL DataSource not implemented yet');
      default:
        throw new Error(`Unknown datasource type: ${type}`);
    }
  }, [type]);

  const value = useMemo(() => ({
    dataSource,
    currentType: type,
  }), [dataSource, type]);

  return (
    <DataSourceContext.Provider value={value}>
      {children}
    </DataSourceContext.Provider>
  );
}

export function useDataSourceContext(): DataSourceContextType {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error('useDataSourceContext must be used within DataSourceProvider');
  }
  return context;
} 
 
 
 