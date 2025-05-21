'use client';

import React, { useState, FormEvent } from 'react';
import { useLetters } from '@/hooks/useLetters';

interface AddLetterFormProps {
  onRoomNumberChange: (roomNumber: string) => void;
  initialRoomNumber?: string;
}

export const AddLetterForm: React.FC<AddLetterFormProps> = ({
  onRoomNumberChange,
  initialRoomNumber = '',
}): React.ReactElement => {
  const [roomNumber, setRoomNumber] = useState(initialRoomNumber);
  const { addLetter } = useLetters();

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!roomNumber.trim()) return;

    void (async (): Promise<void> => {
      try {
        await addLetter.mutateAsync({
          room_number: roomNumber,
        });
        onRoomNumberChange(roomNumber);
      } catch (error) {
        console.error('Ошибка при добавлении письма:', error);
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-stretch">
      <div className="flex flex-col gap-1">
        <label htmlFor="roomNumber" className="text-sm font-medium text-gray-700">
          Номер комнаты
        </label>
        <input
          type="text"
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full shadow-sm"
          placeholder="Введите номер комнаты"
          required
        />
      </div>
      <button
        type="submit"
        disabled={addLetter.isPending || !roomNumber.trim()}
        className="w-full bg-blue-600 text-white text-base font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-50"
      >
        {addLetter.isPending ? 'Добавление...' : 'Добавить письмо'}
      </button>
      {addLetter.isError && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Ошибка при добавлении письма. Попробуйте еще раз.
        </p>
      )}
    </form>
  );
};
