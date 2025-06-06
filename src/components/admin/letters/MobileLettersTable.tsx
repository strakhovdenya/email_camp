import { useState } from 'react';
import { LetterWithRelations } from '@/types/supabase';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ChevronUp, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MobileLettersTableProps {
  letters: LetterWithRelations[];
  onDeliver: (id: string) => void;
  deliverLoadingId: string | null;
}

export function MobileLettersTable({
  letters,
  onDeliver,
  deliverLoadingId,
}: MobileLettersTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4 p-4">
      {letters.map((letter) => (
        <div key={letter.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4">
            {/* Основная информация */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Письмо #{letter.id}</span>
                  {letter.note && (
                    <span className="ml-2 text-xs text-muted-foreground italic truncate max-w-[120px]">
                      {letter.note}
                    </span>
                  )}
                </div>
                {letter.rooms?.room_number && (
                  <span className="text-xs text-muted-foreground mt-1">
                    Комната: <b>{letter.rooms.room_number}</b>
                  </span>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleExpand(letter.id)}>
                {expandedId === letter.id ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Статус и дата */}
            <div className="mt-2 flex items-center justify-between">
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                  letter.status === 'delivered'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                )}
              >
                {letter.status === 'delivered' ? 'Выдано' : 'Ожидает'}
              </span>
              <span className="text-sm text-muted-foreground">
                {format(new Date(letter.created_at), 'dd MMM yyyy', { locale: ru })}
              </span>
            </div>

            {/* Получатель */}
            {letter.users && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>
                  {letter.users.first_name} {letter.users.last_name}
                </span>
              </div>
            )}

            {/* Расширенная информация */}
            {expandedId === letter.id && (
              <div className="mt-4 space-y-2 border-t pt-4">
                {letter.note && (
                  <div className="text-sm">
                    <span className="font-medium">Заметка:</span>
                    <p className="mt-1 text-muted-foreground">{letter.note}</p>
                  </div>
                )}

                {letter.photo_url && (
                  <div className="text-sm">
                    <span className="font-medium">Фото:</span>
                    <div className="mt-1">
                      <Image
                        src={letter.photo_url}
                        alt="Фото письма"
                        width={128}
                        height={128}
                        className="h-32 w-32 rounded-lg object-cover"
                      />
                    </div>
                  </div>
                )}

                {letter.delivered_at && (
                  <div className="text-sm">
                    <span className="font-medium">Выдано:</span>
                    <p className="mt-1 text-muted-foreground">
                      {format(new Date(letter.delivered_at), 'dd MMM yyyy HH:mm', { locale: ru })}
                    </p>
                  </div>
                )}

                {/* Кнопка выдачи */}
                {letter.status === 'pending' && (
                  <Button
                    className="mt-4 w-full"
                    onClick={() => onDeliver(letter.id)}
                    disabled={deliverLoadingId === letter.id}
                  >
                    {deliverLoadingId === letter.id ? 'Выдача...' : 'Выдать письмо'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
