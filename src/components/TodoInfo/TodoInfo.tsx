import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './TodoInfo.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../types/types';
import { apiPatchTodo } from '../../services/todoApi';

function TodoInfo() {
  const queryClient = useQueryClient();
  const todoData: Todo[] | undefined = queryClient.getQueryData(['todos']);

  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [dateTodo, setDateTodo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (todoData) {
      const foundTodo = todoData.find((todo) => id && parseInt(id) === todo.id);

      if (foundTodo) {
        const date = new Date(foundTodo?.id);
        const formattedDate = `${date.toLocaleDateString(
          'ru-RU'
        )} ${date.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        })}`;

        setDateTodo(formattedDate);
        setTitle(foundTodo.caption);
        setDescription(foundTodo.description);
      }
    }
  }, [todoData, id]);

  return (
    <>
      <h2>Информация о Задаче</h2>
      <p>{`Создано: ${dateTodo}`}</p>
      <p>{`Задача: ${title}`}</p>
      <p>{`Описание: ${description}`}</p>
      <button className={styles.button} onClick={handleBack}>
        Назад
      </button>
    </>
  );
}

export default TodoInfo;
