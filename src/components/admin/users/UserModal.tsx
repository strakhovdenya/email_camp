import React, { useState } from 'react';
import type { User } from '@/types/supabase';
import { NOTIFICATION_CHANNELS } from '@/constants/notificationChannels';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface UserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
  loading?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ user, open, onClose, onSave, loading }) => {
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [roomId, setRoomId] = useState<string | null>(user?.room_id?.toString() || null);
  const [role, setRole] = useState<'admin' | 'staff' | 'camper'>(user?.role || 'camper');
  const [channels, setChannels] = useState<string[]>(user?.channels_for_notification || []);

  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('id, room_number')
        .order('room_number', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  React.useEffect(() => {
    setFirstName(user?.first_name || '');
    setLastName(user?.last_name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setRoomId(user?.room_id?.toString() || null);
    setRole(user?.role || 'camper');
    setChannels(user?.channels_for_notification || []);
  }, [user, open]);

  const handleChannelToggle = (channel: string) => {
    setChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !roomId) {
      return;
    }
    await onSave({
      id: user?.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      room_id: roomId,
      role,
      channels_for_notification: channels,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {user ? 'Редактировать пользователя' : 'Добавить пользователя'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Фамилия
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Имя
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Телефон
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Комната
            </label>
            <select
              value={roomId || ''}
              onChange={(e) => setRoomId(e.target.value || null)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              required
            >
              <option value="">Выберите комнату</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.room_number}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Роль
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'staff' | 'camper')}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            >
              <option value="camper">Camper</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Каналы уведомлений
            </label>
            <div className="space-y-2">
              {NOTIFICATION_CHANNELS.map((channel) => (
                <label key={channel} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={channels.includes(channel)}
                    onChange={() => handleChannelToggle(channel)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{channel}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : user ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
