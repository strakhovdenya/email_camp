import React from 'react';

interface Letter {
  id: number;
  room_id: number;
  created_at: string;
  delivered_at: string | null;
  status: 'pending' | 'delivered';
  sync_status: 'pending' | 'synced' | 'failed';
  note?: string;
  photo_url?: string;
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
            <div className="mt-1 flex items-center gap-2">
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
              {letter.photo_url && (
                <button
                  type="button"
                  className="ml-2 text-blue-500 hover:text-blue-700"
                  title="Посмотреть фото"
                  onClick={() => window.open(letter.photo_url, '_blank')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5V7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5l5.25-5.25a2.25 2.25 0 013.18 0l5.25 5.25"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 9.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
