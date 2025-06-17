import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDataSourceWithContext } from './useDataSourceWithContext';
import type { CreateUserInput, UpdateUserInput, CreateLetterInput, UpdateLetterInput } from '@/datasources/interfaces/IDataSource';

// Хуки для пользователей с поддержкой контекста
export function useDemoUsers() {
  const dataSource = useDataSourceWithContext();

  return useQuery({
    queryKey: ['demo-users'],
    queryFn: () => dataSource.users.getUsers(),
  });
}

export function useDemoUsersByRoom(roomNumber: string) {
  const dataSource = useDataSourceWithContext();

  return useQuery({
    queryKey: ['demo-users', 'room', roomNumber],
    queryFn: () => dataSource.users.getUsersByRoom(roomNumber),
    enabled: !!roomNumber,
  });
}

export function useDemoUserMutations() {
  const dataSource = useDataSourceWithContext();
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: (data: CreateUserInput) => dataSource.users.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo-users'] });
    },
  });

  const updateUser = useMutation({
    mutationFn: (data: UpdateUserInput) => dataSource.users.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo-users'] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => dataSource.users.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo-users'] });
    },
  });

  return {
    createUser,
    updateUser,
    deleteUser,
  };
}

// Хуки для писем с поддержкой контекста
export function useDemoLetters() {
  const dataSource = useDataSourceWithContext();

  return useQuery({
    queryKey: ['demo-letters'],
    queryFn: () => dataSource.letters.getLetters(),
  });
}

export function useDemoLettersByRoom(roomNumber: string) {
  const dataSource = useDataSourceWithContext();

  return useQuery({
    queryKey: ['demo-letters', 'room', roomNumber],
    queryFn: () => dataSource.letters.getLettersByRoom(roomNumber),
    enabled: !!roomNumber,
  });
}

export function useDemoLetterMutations() {
  const dataSource = useDataSourceWithContext();
  const queryClient = useQueryClient();

  const createLetter = useMutation({
    mutationFn: (data: CreateLetterInput) => dataSource.letters.createLetter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo-letters'] });
    },
  });

  const updateLetter = useMutation({
    mutationFn: (data: UpdateLetterInput) => dataSource.letters.updateLetter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo-letters'] });
    },
  });

  const markAsDelivered = useMutation({
    mutationFn: (id: string) => dataSource.letters.markAsDelivered(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo-letters'] });
    },
  });

  return {
    createLetter,
    updateLetter,
    markAsDelivered,
  };
}

// Хуки для комнат с поддержкой контекста
export function useDemoRooms() {
  const dataSource = useDataSourceWithContext();

  return useQuery({
    queryKey: ['demo-rooms'],
    queryFn: () => dataSource.rooms.getRooms(),
  });
} 
 
 
 