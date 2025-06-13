import { useState } from 'react';
import { LetterWithRelations } from '@/types/supabase';
import { ChevronDown, ChevronUp, Mail, CheckCircle2, Clock } from 'lucide-react';
import { cn, formatSafeDate } from '@/lib/utils';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import { motion, AnimatePresence } from 'framer-motion';
import Slide from '@mui/material/Slide';

interface MobileLettersTableProps {
  letters: LetterWithRelations[];
  onDeliver: (id: string) => void;
  deliverLoadingId: string | null;
}

const emptyIllustration = (
  <div className="flex flex-col items-center justify-center py-16 opacity-70">
    <Mail className="w-16 h-16 text-blue-400 mb-4" />
    <div className="text-lg font-semibold text-gray-500">Писем нет</div>
    <div className="text-sm text-gray-400">Все письма выданы или не добавлены</div>
  </div>
);

export function MobileLettersTable({
  letters,
  onDeliver,
  deliverLoadingId,
}: MobileLettersTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDeliver = (id: string) => {
    onDeliver(id);
    setSnackbarMsg('Письмо успешно выдано!');
    setSnackbarOpen(true);
  };

  if (!letters.length) {
    return emptyIllustration;
  }

  return (
    <div className="space-y-6 p-4">
      <AnimatePresence>
        {letters.map((letter) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, type: 'spring', bounce: 0.18 }}
            className="group rounded-2xl border border-blue-100 bg-white/60 backdrop-blur-lg text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.01]"
          >
            <div className="p-6">
              {/* Основная информация */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold text-lg">
                      {letter.note || <span className="text-gray-400">—</span>}
                    </span>
                  </div>
                  {letter.rooms?.room_number && (
                    <span className="text-sm text-gray-600 mt-1">
                      Комната: <b className="text-blue-600">{letter.rooms.room_number}</b>
                    </span>
                  )}
                </div>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => toggleExpand(letter.id)}
                  sx={{ minWidth: 0, p: 1, borderRadius: '50%' }}
                >
                  {expandedId === letter.id ? (
                    <ChevronUp className="h-4 w-4 text-blue-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-blue-500" />
                  )}
                </Button>
              </div>

              {/* Статус и дата */}
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm',
                    letter.status === 'delivered'
                      ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700'
                      : 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700'
                  )}
                >
                  {letter.status === 'delivered' ? (
                    <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 mr-1 text-yellow-500" />
                  )}
                  {letter.status === 'delivered' ? 'Выдано' : 'Ожидает'}
                </span>
                <span className="text-sm text-gray-500">
                  {formatSafeDate(letter.created_at, 'dd MMM yyyy')}
                </span>
              </div>

              {/* Получатель */}
              {letter.users && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Avatar sx={{ width: 28, height: 28, bgcolor: '#3b82f6', fontSize: 14 }}>
                    {letter.users.first_name?.[0] || ''}
                    {letter.users.last_name?.[0] || ''}
                  </Avatar>
                  <span>
                    {letter.users.first_name} {letter.users.last_name}
                  </span>
                </div>
              )}

              {/* Расширенная информация */}
              {expandedId === letter.id && (
                <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
                  {letter.photo_url ? (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Фото:</span>
                      <div className="mt-2">
                        <Image
                          src={letter.photo_url}
                          alt="Фото письма"
                          width={128}
                          height={128}
                          className="h-32 w-32 rounded-xl object-cover shadow-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={128}
                      height={128}
                      className="rounded-xl"
                    />
                  )}
                  {letter.delivered_at && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Выдано:</span>
                      <p className="mt-2 text-gray-600">
                        {formatSafeDate(letter.delivered_at, 'dd MMM yyyy HH:mm')}
                      </p>
                    </div>
                  )}
                  {/* Кнопка выдачи */}
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
                        mt: 2,
                        '&:hover': {
                          background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
                        },
                      }}
                      onClick={() => handleDeliver(letter.id)}
                      disabled={deliverLoadingId === letter.id}
                      disableElevation
                      fullWidth
                    >
                      {deliverLoadingId === letter.id ? 'Выдача...' : 'Выдать письмо'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
          icon={<CheckCircle2 fontSize="inherit" />}
        >
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
