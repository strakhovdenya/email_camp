import React, { useState } from 'react';
import { Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import {
  useLettersByRoomDataSource,
  useLetterMutationsDataSource,
} from '@/hooks/useLettersDataSource';
import { useUsersByRoomDataSource } from '@/hooks/useUsersDataSource';
import { LetterList } from '@/components/LetterList';
import { mockDeliverPageStyles } from './MockDeliverPage.styles';

interface MockDeliverPageProps {
  roomNumber: string;
}

export const MockDeliverPage = ({ roomNumber }: MockDeliverPageProps) => {
  const { data: letters = [] } = useLettersByRoomDataSource(roomNumber);
  const { data: users = [] } = useUsersByRoomDataSource(roomNumber);
  const { markAsDelivered } = useLetterMutationsDataSource();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const count = letters.length;

  // Фильтруем письма по выбранному пользователю
  const filteredLetters = selectedUserId
    ? letters.filter((letter) => String(letter.user_id) === selectedUserId)
    : letters;

  return (
    <main className={mockDeliverPageStyles.container}>
      {/* Header */}
      <div className={mockDeliverPageStyles.header}>
        <h1 className={mockDeliverPageStyles.title}>Выдача писем — комната {roomNumber}</h1>
        <Chip
          label={`Писем: ${count}`}
          color="primary"
          size="small"
          sx={mockDeliverPageStyles.chip}
        />
      </div>

      {/* User filter section */}
      <motion.section
        className={mockDeliverPageStyles.filterSection}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={2} className="rounded-2xl">
          <CardContent className={mockDeliverPageStyles.filterContent}>
            <label htmlFor="userFilter" className={mockDeliverPageStyles.filterLabel}>
              <span className="w-4 h-4 text-blue-400">🔽</span> Фильтр по пользователю
            </label>
            <select
              id="userFilter"
              value={selectedUserId ?? ''}
              onChange={(e) => setSelectedUserId(e.target.value || null)}
              className={mockDeliverPageStyles.filterSelect}
            >
              <option value="">Все пользователи</option>
              {users.map((user: { id: string; first_name: string; last_name: string }) => (
                <option key={user.id} value={user.id}>
                  {user.last_name} {user.first_name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </motion.section>

      {/* Letters list */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <LetterList
          letters={filteredLetters}
          onDeliver={(id) => markAsDelivered.mutate(id)}
          deliverLoadingId={markAsDelivered.isPending ? markAsDelivered.variables : null}
        />
      </motion.section>
    </main>
  );
};
