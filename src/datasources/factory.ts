import type { IDataSource } from './interfaces/IDataSource';
import { CURRENT_DATASOURCE } from '@/config/datasource';
import { SupabaseDataSource } from './supabase/SupabaseDataSource';
import { MockDataSource } from './mock/MockDataSource';

// Singleton instance
let dataSourceInstance: IDataSource | null = null;

/**
 * Фабрика для создания источника данных на основе конфигурации
 */
export function createDataSource(): IDataSource {
  if (dataSourceInstance) {
    return dataSourceInstance;
  }

  switch (CURRENT_DATASOURCE) {
    case 'supabase':
      dataSourceInstance = new SupabaseDataSource();
      break;
    
    case 'mock':
      dataSourceInstance = new MockDataSource();
      break;
    
    case 'postgresql':
      throw new Error('PostgreSQL DataSource not implemented yet');
    
    case 'mysql':
      throw new Error('MySQL DataSource not implemented yet');
    
    default:
      throw new Error(`Unknown datasource type: ${CURRENT_DATASOURCE}`);
  }

  return dataSourceInstance;
}

/**
 * Получить текущий источник данных (singleton)
 */
export function getDataSource(): IDataSource {
  return createDataSource();
}

/**
 * Сбросить singleton (полезно для тестов)
 */
export function resetDataSource(): void {
  dataSourceInstance = null;
}

/**
 * Инициализировать источник данных
 */
export async function initializeDataSource(): Promise<void> {
  const dataSource = getDataSource();
  await dataSource.initialize();
}

/**
 * Отключиться от источника данных
 */
export async function disconnectDataSource(): Promise<void> {
  if (dataSourceInstance) {
    await dataSourceInstance.disconnect();
    dataSourceInstance = null;
  }
} 
 
 
 