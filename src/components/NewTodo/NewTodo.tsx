import { useState } from 'react';
import { apiSaveTodo } from '../../services/todoApi';
import { Todo } from '../../types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './NewTodo.module.css';

function NewTodo() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const mutation = useMutation({
    mutationFn: apiSaveTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      console.error('Ошибка при добавлении тудушки');
    },
  });

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(`Task - ${title} - ${description}`);

    if (title) {
      const newTodo: Todo = {
        id: Date.now(),
        caption: title ?? '',
        description: description ?? '',
        complete: false,
      };

      mutation.mutate(newTodo);
      // saveTodo(newTodo);
      // queryClient.invalidateQueries({ queryKey: ['todos'] });
    }

    setTitle('');
    setDescription('');
  };

  return (
    <form className={styles.mainForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
        placeholder="Введите заголовок"
      />
      <input
        type="text"
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
        placeholder="Введите описание"
      />
      <button className={styles.formButton} type="submit">
        Добавить
      </button>
      <button
        className={styles.formButton}
        type="button"
        onClick={() => {
          setTitle('');
          setDescription('');
        }}
      >
        Очистить
      </button>
    </form>
  );
}

export default NewTodo;
