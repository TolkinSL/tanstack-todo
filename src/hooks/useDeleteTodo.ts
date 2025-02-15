import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiDeleteTodo } from '../services/todoApi';
import { Todo } from '../types/types';

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // Обновляем список
    },
    onError: (error) => {
      console.error('Ошибка при удалении тудушки:', error);
    },
  });
};

export { useDeleteTodo };
