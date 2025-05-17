import React, { useState, FormEvent } from 'react';
import { useLetters } from '@/hooks/useLetters';

interface AddLetterFormProps {
  onRoomNumberChange: (roomNumber: string) => void;
}

export const AddLetterForm: React.FC<AddLetterFormProps> = ({
  onRoomNumberChange,
}): React.ReactElement => {
  const [roomNumber, setRoomNumber] = useState('');
  const { addLetter } = useLetters();

  const generateBarcodeId = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`;
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!roomNumber.trim()) return;

    void (async (): Promise<void> => {
      try {
        await addLetter.mutateAsync({
          room_number: roomNumber,
          barcode_id: generateBarcodeId(),
        });
        onRoomNumberChange(roomNumber);
      } catch (error) {
        console.error('Ошибка при добавлении письма:', error);
      }
    })();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="roomNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Номер комнаты
        </label>
        <input
          type="text"
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Введите номер комнаты"
          required
          {...(typeof window !== 'undefined' ? {} : { suppressHydrationWarning: true })}
        />
      </div>

      <button
        type="submit"
        disabled={addLetter.isPending || !roomNumber.trim()}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {addLetter.isPending ? 'Добавление...' : 'Добавить письмо'}
      </button>

      {addLetter.isError && (
        <p className="text-red-500 text-sm mt-2">
          Ошибка при добавлении письма. Попробуйте еще раз.
        </p>
      )}
    </form>
  );
};
