import { useQuery } from '@tanstack/react-query';

interface CurrentUser {
  id: string;
  email: string;
  role: string;
}

export function useCurrentUser() {
  return useQuery<CurrentUser | null>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch('/api/auth/me');
      const result = await response.json();
      
      if (response.status === 401) {
        return null; // Пользователь не авторизован
      }
      
      if (!result.success) {
        throw new Error(result.error || 'Ошибка получения пользователя');
      }
      
      return result.data;
    },
    retry: false, // Не повторяем запрос при 401 ошибке
  });
} 