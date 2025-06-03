import React from 'react';

interface AdminTableProps<T> {
  columns: { key: string; label: string; className?: string }[];
  data: T[];
  isLoading?: boolean;
  renderRow: (row: T) => React.ReactNode;
  emptyText?: string;
}

export function AdminTable<T>({
  columns,
  data,
  isLoading,
  renderRow,
  emptyText,
}: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900 rounded-lg shadow">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider ${col.className || ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-400 dark:text-gray-500 animate-pulse"
              >
                Загрузка данных...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-400 dark:text-gray-500"
              >
                {emptyText || 'Нет данных'}
              </td>
            </tr>
          ) : (
            data.map(renderRow)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
