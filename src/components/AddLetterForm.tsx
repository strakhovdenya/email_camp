'use client';

import React, { useState, FormEvent } from 'react';
import { useAddLetter } from '@/hooks/useLetters';
import { supabase } from '@/lib/supabase';
import imageCompression from 'browser-image-compression';
import { useUsers } from '@/hooks/useUsers';
import { PhotoDropzone } from './ui';
import { useToast } from '@/providers/ToastProvider';
import { TOAST_TYPES } from '@/constants/toastTypes';

interface AddLetterFormProps {
  onRoomNumberChange: (roomNumber: string) => void;
  initialRoomNumber?: string;
}

type AddLetterWithNotifying = ReturnType<typeof useAddLetter> & { notifying: boolean };

export const AddLetterForm: React.FC<AddLetterFormProps> = ({
  onRoomNumberChange,
  initialRoomNumber = '',
}): React.ReactElement => {
  const [roomNumber, setRoomNumber] = useState(initialRoomNumber);
  const addLetter = useAddLetter() as AddLetterWithNotifying;
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: users = [], isLoading: usersLoading } = useUsers(roomNumber);
  const { showToast } = useToast();

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!roomNumber.trim() || !selectedUserId) return;

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
          user_id: selectedUserId,
        });
        showToast('Письмо успешно добавлено', TOAST_TYPES.SUCCESS);
        onRoomNumberChange(roomNumber);
        setNote('');
        setPhoto(null);
        setPhotoPreview(null);
        setSelectedUserId(null);
      } catch (error) {
        showToast('Ошибка при добавлении письма', TOAST_TYPES.ERROR);
        console.error('Error adding letter:', error);
      }
    })();
  };

  const handlePhotoAccepted = async (file: File) => {
    // Сжимаем фото перед загрузкой
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1, // максимум 1 МБ
      maxWidthOrHeight: 2048, // максимум 2048px по ширине или высоте
      useWebWorker: true,
    });
    setPhoto(compressedFile);
    setPhotoPreview(URL.createObjectURL(compressedFile));
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-stretch">
      <div className="flex flex-col gap-1">
        <label htmlFor="roomNumber" className="text-sm font-medium text-gray-700">
          Room number
        </label>
        <input
          type="text"
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full shadow-sm"
          placeholder="Enter room number"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="note" className="text-sm font-medium text-gray-700">
          Letter description
        </label>
        <input
          type="text"
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full shadow-sm"
          placeholder="For example: for mom, from grandma, important..."
          maxLength={100}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Letter photo (take a picture)</label>
        <PhotoDropzone
          onFileAccepted={handlePhotoAccepted}
          previewUrl={photoPreview}
          onRemove={photo ? handleRemovePhoto : undefined}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="user" className="text-sm font-medium text-gray-700">
          Letter recipient
        </label>
        <select
          id="user"
          value={selectedUserId ?? ''}
          onChange={(e) => setSelectedUserId(Number(e.target.value) || null)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full shadow-sm"
          required
          disabled={usersLoading || users.length === 0}
        >
          <option value="" disabled>
            {usersLoading ? 'Loading...' : 'Select recipient'}
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.last_name} {user.first_name} ({user.email})
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={addLetter.isPending || addLetter.notifying || !roomNumber.trim()}
        className="w-full bg-blue-600 text-white text-base font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-50"
      >
        {addLetter.isPending || addLetter.notifying ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Add letter'
        )}
      </button>
      {addLetter.isError && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Error adding letter. Please try again.
        </p>
      )}
    </form>
  );
};
