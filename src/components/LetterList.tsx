import React from 'react';

interface Letter {
  id: number;
  room_id: number;
  created_at: string;
  delivered_at: string | null;
  status: 'pending' | 'delivered';
  sync_status: 'pending' | 'synced' | 'failed';
  note?: string;
}

interface LetterListProps {
  letters: Letter[];
}

export const LetterList: React.FC<LetterListProps> = ({ letters }): React.ReactElement => {
  if (letters.length === 0) {
    return <div className="text-gray-400 text-center py-6">Нет писем для этой комнаты</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {letters.map((letter) => (
        <div
          key={letter.id}
          className="bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-4 border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex-shrink-0 flex flex-col items-center justify-center">
            {letter.status === 'delivered' ? (
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            ) : (
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                </svg>
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="font-semibold text-gray-900 text-base">Письмо #{letter.id}</span>
              <span className="text-xs text-gray-400">
                {new Date(letter.created_at).toLocaleString()}
              </span>
            </div>
            <div className="mt-1">
              <span
                className={`text-xs font-medium rounded px-2 py-1 inline-block ${
                  letter.status === 'delivered'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {letter.status === 'delivered' ? 'Доставлено' : 'Ожидает доставки'}
              </span>
              {letter.note && (
                <span className="ml-2 text-xs text-blue-700 bg-blue-50 rounded px-2 py-1">
                  {letter.note}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
