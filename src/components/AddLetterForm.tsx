'use client';

import React, { useState, FormEvent } from 'react';
import { useLetters } from '@/hooks/useLetters';
import { supabase } from '@/lib/supabase';
import imageCompression from 'browser-image-compression';
import Image from 'next/image';

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
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!roomNumber.trim()) return;

    void (async (): Promise<void> => {
      try {
        let photoUrl: string | undefined = undefined;
        if (photo) {
          const fileExt = photo.name.split('.').pop();
          const fileName = `letter_${Date.now()}.${fileExt}`;
          const { error } = await supabase.storage.from('letters-photos').upload(fileName, photo);
          if (error) throw error;
          const { data: publicUrlData } = supabase.storage
            .from('letters-photos')
            .getPublicUrl(fileName);
          photoUrl = publicUrlData?.publicUrl;
        }
        await addLetter.mutateAsync({
          room_number: roomNumber,
          note: note.trim() || undefined,
          photo_url: photoUrl,
        });
        onRoomNumberChange(roomNumber);
        setNote('');
        setPhoto(null);
        setPhotoPreview(null);
      } catch (error) {
        console.error('Ошибка при добавлении письма:', error);
      }
    })();
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Сжимаем фото перед загрузкой
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.2, // максимум 200 КБ
        maxWidthOrHeight: 1024, // максимум 1024px по ширине или высоте
        useWebWorker: true,
      });
      setPhoto(compressedFile);
      setPhotoPreview(URL.createObjectURL(compressedFile));
    }
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
      <div className="flex flex-col gap-1">
        <label htmlFor="note" className="text-sm font-medium text-gray-700">
          Краткое описание письма
        </label>
        <input
          type="text"
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full shadow-sm"
          placeholder="Например: для мамы, от бабушки, важное..."
          maxLength={100}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="photo" className="text-sm font-medium text-gray-700">
          Фото письма (сделайте снимок)
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          capture="environment"
          onChange={handlePhotoChange}
          className="rounded-lg border border-gray-300 px-4 py-2 text-base"
        />
        {photoPreview && (
          <Image
            src={photoPreview}
            alt="Фото письма"
            className="mt-2 max-h-40 rounded"
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
          />
        )}
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
