import { useMemo } from 'react';
import { getDataSource } from '@/datasources/factory';
import { useDataSourceContext } from '@/providers/DataSourceProvider';
import type { IDataSource } from '@/datasources/interfaces/IDataSource';

/**
 * Хук для получения источника данных с поддержкой контекста
 * Если компонент обернут в DataSourceProvider, использует контекстный источник
 * Иначе использует глобальный источник из конфигурации
 */
export function useDataSource(): IDataSource {
  // Проверяем, есть ли контекстный источник данных
  let contextDataSource: IDataSource | null = null;
  
  try {
    const context = useDataSourceContext();
    contextDataSource = context.dataSource;
  } catch {
    // Контекст недоступен, используем глобальный источник
    contextDataSource = null;
  }

  return useMemo(() => {
    return contextDataSource || getDataSource();
  }, [contextDataSource]);
} 
 
 
 