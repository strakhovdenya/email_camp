import React from 'react';

interface WarningModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ open, message, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Внимание</div>
          <div className="text-gray-700 dark:text-gray-300 mb-6">{message}</div>
          {onConfirm ? (
            <div className="flex gap-3 justify-center">
              <button
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                onClick={onConfirm}
              >
                Удалить все письма и пользователя
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={onClose}
              >
                Отмена
              </button>
            </div>
          ) : (
            <button
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={onClose}
            >
              Ок
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
