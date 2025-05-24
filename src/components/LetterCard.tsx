import React from 'react';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Letter {
  id: number;
  created_at: string;
  delivered_at?: string | null;
  status: 'pending' | 'delivered';
  note?: string;
  photo_url?: string;
}

interface LetterCardProps {
  letter: Letter;
  onDeliver?: () => void;
  deliverLoading?: boolean;
}

export const LetterCard: React.FC<LetterCardProps> = ({ letter, onDeliver, deliverLoading }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-4 border border-gray-100 hover:shadow-xl transition-shadow ${
        letter.status === 'delivered' ? 'opacity-60' : ''
      }`}
    >
      <div className="flex-shrink-0 flex flex-col items-center justify-center">
        {letter.status === 'delivered' ? (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
            <CheckCircleIcon className="w-5 h-5" />
          </span>
        ) : (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600">
            <ClockIcon className="w-5 h-5" />
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="font-semibold text-gray-900 text-base">Письмо #{letter.id}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <ClockIcon className="w-4 h-4 text-gray-400" />
            <span>Создано:</span>
            <span className="font-medium text-gray-700">
              {new Date(letter.created_at).toLocaleString()}
            </span>
          </span>
          {letter.status === 'delivered' && letter.delivered_at && (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <CheckCircleIcon className="w-4 h-4 text-green-400" />
              <span>Доставлено:</span>
              <span className="font-medium">{new Date(letter.delivered_at).toLocaleString()}</span>
            </span>
          )}
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
          {onDeliver && letter.status === 'pending' && (
            <button className="btn ml-2" onClick={onDeliver} disabled={deliverLoading}>
              {deliverLoading ? 'Выдача...' : 'Выдать'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
