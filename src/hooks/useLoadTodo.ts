import { useQuery } from '@tanstack/react-query';
import { apiLoadTodo } from '../services/todoApi';

const useLoadTodo = () => {
  return useQuery({
    queryFn: apiLoadTodo,
    queryKey: ['todos'],
    retry: 1,
  });
};

export { useLoadTodo };
