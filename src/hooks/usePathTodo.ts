import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiPatchTodo } from '../services/todoApi';
import { Todo } from '../types/types';

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiPatchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // Обновляем список
    },
    onError: (error) => {
      console.error('Ошибка при редактировании тудушки:', error);
    },
  });
};

export { useDeleteTodo };
