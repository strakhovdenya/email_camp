import React from 'react';
import { Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useLettersByRoomDataSource } from '@/hooks/useLettersDataSource';
import { AddLetterForm } from '@/components/AddLetterForm';
import { LetterList } from '@/components/LetterList';
import { mockAddLetterPageStyles } from './MockAddLetterPage.styles';

interface MockAddLetterPageProps {
  roomNumber: string;
}

export const MockAddLetterPage = ({ roomNumber }: MockAddLetterPageProps) => {
  const { data: letters = [] } = useLettersByRoomDataSource(roomNumber);
  const count = letters.length;

  return (
    <main className={mockAddLetterPageStyles.container}>
      {/* Room header */}
      <div className={mockAddLetterPageStyles.header}>
        <h1 className={mockAddLetterPageStyles.title}>
          <span role="img" aria-label="room">
            🏠
          </span>{' '}
          Комната {roomNumber}
        </h1>
        <Chip
          label={`Писем: ${count}`}
          color="primary"
          size="small"
          sx={mockAddLetterPageStyles.chip}
        />
      </div>

      {/* Add letter section */}
      <motion.section
        className={mockAddLetterPageStyles.section}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={3} className="rounded-2xl">
          <CardContent className={mockAddLetterPageStyles.cardContent}>
            <h2 className={mockAddLetterPageStyles.sectionTitle}>Добавить письмо</h2>
            <AddLetterForm onRoomNumberChange={() => {}} initialRoomNumber={roomNumber} />
          </CardContent>
        </Card>
      </motion.section>

      {/* List of letters section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card elevation={3} className="rounded-2xl">
          <CardContent className={mockAddLetterPageStyles.cardContent}>
            <h2 className={mockAddLetterPageStyles.sectionTitle}>Список писем</h2>
            <LetterList letters={letters} deliverLoadingId={null} />
          </CardContent>
        </Card>
      </motion.section>
    </main>
  );
};
