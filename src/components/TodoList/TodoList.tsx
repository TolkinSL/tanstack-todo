import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLoadTodo } from '../../hooks/useLoadTodo';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';

function TodoList() {
  // const queryClient = useQueryClient();
  const { data, error, isLoading } = useLoadTodo();
  const deleteMutation = useDeleteTodo();

  if (isLoading) return <p>Загрузка...</p>;
  if (error)
    return <p style={{ color: 'red' }}>Ошибка загрузки: {error.message}</p>;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '6px',
      }}
    >
      {data?.map((todo) => (
        <div
          key={todo.id}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <p style={{ color: 'red' }}>
            {todo.caption} - {todo.text}
          </p>
          <button onClick={() => deleteMutation.mutate(todo)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
