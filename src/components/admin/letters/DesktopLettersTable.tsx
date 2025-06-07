import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { LetterWithRelations } from '@/types/supabase';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { CheckCircle2, Clock, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  letters: LetterWithRelations[];
  onDeliver: (id: string) => void;
  deliverLoadingId: string | null;
}

const emptyIllustration = (
  <div className="flex flex-col items-center justify-center py-24 opacity-70">
    <Mail className="w-20 h-20 text-blue-400 mb-4" />
    <div className="text-2xl font-semibold text-gray-500">Писем нет</div>
    <div className="text-base text-gray-400">Все письма выданы или не добавлены</div>
  </div>
);

export function DesktopLettersTable({ letters, onDeliver, deliverLoadingId }: Props) {
  if (!letters.length) {
    return emptyIllustration;
  }
  return (
    <div className="w-full min-w-0">
      <div className="overflow-x-auto rounded-2xl">
        <Table className="w-full min-w-[900px]">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-50 to-blue-100">
              <TableHead className="font-bold text-gray-700 px-2 py-2 w-12">ID</TableHead>
              <TableHead className="font-bold text-gray-700 px-2 py-2 w-20">Комната</TableHead>
              <TableHead className="font-bold text-gray-700 px-2 py-2 w-48">Получатель</TableHead>
              <TableHead className="font-bold text-gray-700 px-2 py-2 w-32">Статус</TableHead>
              <TableHead className="font-bold text-gray-700 px-2 py-2 w-36">
                Дата создания
              </TableHead>
              <TableHead className="font-bold text-gray-700 px-2 py-2 w-36">Дата выдачи</TableHead>
              <TableHead className="font-bold text-gray-700 px-2 py-2 max-w-[120px] truncate">
                Заметка
              </TableHead>
              <TableHead className="font-bold text-gray-700 px-2 py-2 w-20">Фото</TableHead>
              <TableHead className="font-bold text-gray-700 px-2 py-2 w-28">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {letters.map((letter) => (
                <motion.tr
                  key={letter.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.35, type: 'spring', bounce: 0.18 }}
                  className="hover:bg-blue-50 transition-colors duration-150 group"
                >
                  <TableCell className="font-semibold text-gray-800 px-2 py-2 w-12">
                    {letter.id}
                  </TableCell>
                  <TableCell className="text-blue-700 font-medium px-2 py-2 w-20">
                    {letter.rooms?.room_number}
                  </TableCell>
                  <TableCell className="text-gray-700 px-2 py-2 w-48 truncate">
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#3b82f6', fontSize: 14 }}>
                        {letter.users?.first_name?.[0] || ''}
                        {letter.users?.last_name?.[0] || ''}
                      </Avatar>
                      <span className="truncate">
                        {letter.users?.first_name} {letter.users?.last_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-2 py-2 w-32">
                    <span
                      className={
                        letter.status === 'delivered'
                          ? 'inline-flex items-center gap-1 rounded-full px-3 py-1.5 bg-gradient-to-r from-green-50 to-green-100 text-green-700 text-sm font-semibold shadow-sm'
                          : 'inline-flex items-center gap-1 rounded-full px-3 py-1.5 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 text-sm font-semibold shadow-sm'
                      }
                    >
                      {letter.status === 'delivered' ? (
                        <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 mr-1 text-yellow-500" />
                      )}
                      {letter.status === 'delivered' ? 'Выдано' : 'Ожидает'}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500 px-2 py-2 w-36">
                    {format(new Date(letter.created_at), 'dd.MM.yyyy HH:mm', { locale: ru })}
                  </TableCell>
                  <TableCell className="text-gray-500 px-2 py-2 w-36">
                    {letter.delivered_at ? (
                      format(new Date(letter.delivered_at), 'dd.MM.yyyy HH:mm', { locale: ru })
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600 italic max-w-[120px] truncate px-2 py-2">
                    {letter.note || <span className="text-gray-400">-</span>}
                  </TableCell>
                  <TableCell className="px-2 py-2 w-20">
                    {letter.photo_url ? (
                      <Image
                        src={letter.photo_url}
                        alt="Фото письма"
                        width={60}
                        height={60}
                        className="w-12 h-12 rounded-lg object-cover shadow-md border border-gray-100"
                      />
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                    )}
                  </TableCell>
                  <TableCell className="px-2 py-2 w-28">
                    {letter.status === 'pending' && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                          boxShadow: 3,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: '1rem',
                          px: 2,
                          py: 1,
                          minWidth: 80,
                          '&:hover': {
                            background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
                          },
                        }}
                        onClick={() => onDeliver(letter.id)}
                        disabled={deliverLoadingId === letter.id}
                        disableElevation
                        fullWidth
                      >
                        {deliverLoadingId === letter.id ? 'Выдача...' : 'Выдать'}
                      </Button>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
