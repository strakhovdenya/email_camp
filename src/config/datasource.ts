// Конфигурация источника данных
export type DataSourceType = 'supabase' | 'mock' | 'postgresql' | 'mysql';

// НАСТРОЙКА: Измените эту переменную для переключения источника данных
export const CURRENT_DATASOURCE: DataSourceType = 'supabase';

// Дополнительные настройки для разных источников
export const DATASOURCE_CONFIG = {
  supabase: {
    // Настройки Supabase берутся из переменных окружения
  },
  mock: {
    // Настройки для mock данных
    delay: 500, // Имитация задержки API в мс
  },
  postgresql: {
    // Настройки для PostgreSQL
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB || 'email_camp',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
  },
  mysql: {
    // Настройки для MySQL
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DB || 'email_camp',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
  },
} as const; 
 
 
 