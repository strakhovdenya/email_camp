import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { LetterWithRelations } from '@/types/supabase';
import Image from 'next/image';

interface Props {
  letters: LetterWithRelations[];
  onDeliver: (id: string) => void;
  deliverLoadingId: string | null;
}

export function DesktopLettersTable({ letters, onDeliver, deliverLoadingId }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Комната</TableHead>
            <TableHead>Получатель</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Дата выдачи</TableHead>
            <TableHead>Заметка</TableHead>
            <TableHead>Фото</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {letters.map((letter) => (
            <TableRow key={letter.id}>
              <TableCell>{letter.id}</TableCell>
              <TableCell>{letter.rooms?.room_number}</TableCell>
              <TableCell>
                {letter.users?.first_name} {letter.users?.last_name}
              </TableCell>
              <TableCell>
                <span
                  className={letter.status === 'delivered' ? 'text-green-600' : 'text-yellow-600'}
                >
                  {letter.status === 'delivered' ? 'Выдано' : 'Ожидает'}
                </span>
              </TableCell>
              <TableCell>
                {format(new Date(letter.created_at), 'dd.MM.yyyy HH:mm', { locale: ru })}
              </TableCell>
              <TableCell>
                {letter.delivered_at
                  ? format(new Date(letter.delivered_at), 'dd.MM.yyyy HH:mm', { locale: ru })
                  : '-'}
              </TableCell>
              <TableCell>{letter.note || '-'}</TableCell>
              <TableCell>
                {letter.photo_url ? (
                  <Image
                    src={letter.photo_url}
                    alt="Фото письма"
                    width={100}
                    height={100}
                    className="w-24 h-24 object-contain"
                  />
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>
                {letter.status === 'pending' && (
                  <Button
                    onClick={() => onDeliver(letter.id)}
                    disabled={deliverLoadingId === letter.id}
                  >
                    {deliverLoadingId === letter.id ? 'Выдача...' : 'Выдать'}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
