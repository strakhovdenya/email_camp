import React, { useState } from 'react';
import { useRoomsDataSource, useRoomMutationsDataSource } from '@/hooks/useRoomsDataSource';
import SearchInput from '@/components/admin/SearchInput';
import type { Room } from '@/types/supabase';
import RoomModal from './RoomModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  tableRowClass,
  tableCellClass,
  tableHeadClass,
  tableWrapperClass,
  tableHeaderRowClass,
} from '../common/tableStyles';
import { formatSafeDate } from '@/lib/utils';

const columns = [
  { key: 'room_number', label: 'Номер', width: 90 },
  { key: 'created_at', label: 'Создана', width: 110 },
  { key: 'actions', label: '', width: 70 },
];

const DesktopRooms: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRoom, setModalRoom] = useState<Room | null>(null);
  
  // Используем новую DataSource архитектуру
  const { data: rooms = [], isLoading } = useRoomsDataSource();
  const { createRoom, updateRoom, deleteRoom } = useRoomMutationsDataSource();

  const filteredRooms = rooms.filter((room: Room) =>
    room.room_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setModalRoom(null);
    setModalOpen(true);
  };

  const handleEdit = (room: Room) => {
    setModalRoom(room);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<Room>) => {
    try {
      if (data.id) {
        // Обновление существующей комнаты
        await updateRoom.mutateAsync({
          id: data.id,
          room_number: data.room_number!,
        });
      } else {
        // Создание новой комнаты
        await createRoom.mutateAsync({
          room_number: data.room_number!,
        });
      }
      setModalOpen(false);
      setModalRoom(null);
    } catch (error) {
      // Ошибка уже обработана в мутации
      console.error('Error saving room:', error);
    }
  };

  const handleDelete = async (room: Room) => {
    try {
      await deleteRoom.mutateAsync(room.id);
    } catch (error) {
      // Ошибка уже обработана в мутации
      console.error('Error deleting room:', error);
    }
  };

  const isSaving = createRoom.isPending || updateRoom.isPending;

  return (
    <div className="w-full min-w-0">
      <div className="flex justify-between items-center mb-4">
        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Поиск комнат..." />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, fontWeight: 600, ml: 2, textTransform: 'none', boxShadow: 2 }}
          onClick={handleAdd}
        >
          Добавить
        </Button>
      </div>
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
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col.key} className={tableCellClass}>
                        {/* skeleton */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredRooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Комнаты не найдены
                  </TableCell>
                </TableRow>
              ) : (
                filteredRooms.map((room) => (
                  <TableRow key={room.id} className={tableRowClass}>
                    <TableCell className={tableCellClass + ' font-semibold text-gray-800'}>
                      {room.room_number}
                    </TableCell>
                    <TableCell className={tableCellClass + ' text-gray-500'}>
                      {formatSafeDate(room.created_at)}
                    </TableCell>
                    <TableCell className={tableCellClass}>
                      <div className="flex gap-2 justify-end">
                        <Tooltip title="Редактировать">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ minWidth: 0, p: 1, borderRadius: '50%' }}
                            onClick={() => handleEdit(room)}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Удалить">
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ minWidth: 0, p: 1, borderRadius: '50%' }}
                            onClick={() => handleDelete(room)}
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <RoomModal
        room={modalRoom}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalRoom(null);
        }}
        onSave={handleSave}
        loading={isSaving}
      />
    </div>
  );
};

export default DesktopRooms;
