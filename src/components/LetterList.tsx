import React from 'react';
import { useLetters } from '@/hooks/useLetters';

interface LetterListProps {
  roomNumber: string;
}

export const LetterList: React.FC<LetterListProps> = ({ roomNumber }): React.ReactElement => {
  const { letters, isLoading, markAsDelivered } = useLetters(roomNumber);

  if (!roomNumber) {
    return <div className="text-center text-gray-500">Введите или отсканируйте номер комнаты</div>;
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Загрузка писем...</p>
      </div>
    );
  }

  if (!letters?.length) {
    return (
      <div className="text-center text-gray-500">Писем для комнаты {roomNumber} не найдено</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Комната {roomNumber}</h3>
        <span className="text-sm text-gray-500">Всего писем: {letters.length}</span>
      </div>

      <div className="divide-y divide-gray-200">
        {letters.map((letter) => (
          <div
            key={letter.id}
            className="py-4 flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                Получено: {new Date(letter.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Статус: {letter.status === 'delivered' ? 'Доставлено' : 'Ожидает'}
              </p>
              {letter.delivered_at && (
                <p className="text-sm text-gray-500">
                  Доставлено: {new Date(letter.delivered_at).toLocaleString()}
                </p>
              )}
            </div>

            {letter.status !== 'delivered' && (
              <button
                onClick={() => void markAsDelivered.mutate(letter.id)}
                disabled={markAsDelivered.isPending}
                className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {markAsDelivered.isPending ? 'Обновление...' : 'Отметить доставленным'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
