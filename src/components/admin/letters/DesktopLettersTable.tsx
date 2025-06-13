import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { CheckCircle2, Clock, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { formatSafeDate } from '@/lib/utils';
import type { LetterWithRelations } from '@/types/supabase';
import {
  tableRowClass,
  tableCellClass,
  tableHeadClass,
  tableWrapperClass,
  tableHeaderRowClass,
} from '../common/tableStyles';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  letters: LetterWithRelations[];
  onDeliver: (id: string) => void;
  deliverLoadingId: string | null;
}

const columns = [
  { key: 'note', label: 'Описание', width: 120 },
  { key: 'room', label: 'Комната', width: 60 },
  { key: 'user', label: 'Кому', width: 150 },
  { key: 'status', label: 'Статус', width: 90 },
  { key: 'created', label: 'Создано', width: 110 },
  { key: 'delivered', label: 'Выдано', width: 110 },
  { key: 'photo', label: 'Фото', width: 48 },
  { key: 'actions', label: 'Действия', width: 80 },
];

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
      <div className={tableWrapperClass}>
        <TableContainer component={Paper} sx={{ background: 'transparent', boxShadow: 'none' }}>
          <Table className="w-full">
            <TableHead>
              <TableRow className={tableHeaderRowClass}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={tableHeadClass} style={{ width: col.width }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {letters.map((letter) => (
                  <motion.tr
                    key={letter.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.35, type: 'spring', bounce: 0.18 }}
                    className={tableRowClass}
                  >
                    <TableCell className={tableCellClass + ' font-semibold text-gray-800'}>
                      {letter.note || <span className="text-gray-400">—</span>}
                    </TableCell>
                    <TableCell className={tableCellClass + ' text-blue-700 font-medium'}>
                      {letter.rooms?.room_number}
                    </TableCell>
                    <TableCell className={tableCellClass + ' text-gray-700'}>
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
                    <TableCell className={tableCellClass + ' text-center'}>
                      <Tooltip title={letter.status === 'delivered' ? 'Выдано' : 'Ожидает'}>
                        {letter.status === 'delivered' ? (
                          <CheckCircle2 className="text-green-500 w-5 h-5 mx-auto" />
                        ) : (
                          <Clock className="text-yellow-500 w-5 h-5 mx-auto" />
                        )}
                      </Tooltip>
                    </TableCell>
                    <TableCell className={tableCellClass + ' text-gray-500'}>
                      {formatSafeDate(letter.created_at)}
                    </TableCell>
                    <TableCell className={tableCellClass + ' text-gray-500'}>
                      {formatSafeDate(letter.delivered_at)}
                    </TableCell>
                    <TableCell className={tableCellClass}>
                      {letter.photo_url ? (
                        <Image
                          src={letter.photo_url}
                          alt="Фото письма"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-lg object-cover shadow-md border border-gray-100"
                        />
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-lg"
                        />
                      )}
                    </TableCell>
                    <TableCell className={tableCellClass}>
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
        </TableContainer>
      </div>
    </div>
  );
}
