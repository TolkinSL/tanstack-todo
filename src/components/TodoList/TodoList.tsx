import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoadTodo } from '../../hooks/useLoadTodo';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';
import ModalEdit from '../ModalEdit/ModalEdit';
import { Todo } from '../../types/types';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/trash.svg';
import checkOffIcon from '../../assets/check_off.svg';
import checkOnIcon from '../../assets/check_on.svg';
import styles from './TodoList.module.css';
import TodoText from '../TodoText/TodoText';
import { apiPatchTodo } from '../../services/todoApi';

interface ModalEditState {
  open: boolean;
  todo: Partial<Todo>;
}

function TodoList() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useLoadTodo();
  const deleteMutation = useDeleteTodo();

  const [modalEdit, setModalEdit] = useState<ModalEditState>({
    open: false,
    todo: {},
  });

  const openModalEdit = (todo = {}) => {
    setModalEdit({ open: true, todo: todo });
  };

  const closeModalEdit = () => {
    setModalEdit({ open: false, todo: {} });
  };

  //Блок Комплит чекбокс
  const mutation = useMutation({
    mutationFn: apiPatchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      console.error('Ошибка при добавлении тудушки');
    },
  });

  const handleComplete = (todo: Todo) => {
    const newTodo: Todo = { ...todo, complete: !todo.complete };

    mutation.mutate(newTodo);
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error)
    return <p style={{ color: 'red' }}>Ошибка загрузки: {error.message}</p>;

  return (
    <div className={styles.todoList}>
      {data?.map((todo) => (
        <div key={todo.id} className={styles.todoItem}>
          <button
            className={styles.todoIdButton}
            onClick={() => handleComplete(todo)}
          >
            <img
              src={!todo.complete ? checkOffIcon : checkOnIcon}
              className={styles.idButtonIcon}
              alt="check Icon"
            />
          </button>
          <TodoText
            isActive={todo.complete}
            caption={todo.caption}
            description={todo.description}
          />
          <button
            className={styles.actionButton}
            onClick={() => openModalEdit(todo)}
          >
            <img src={editIcon} className={styles.iconButton} alt="edit Icon" />
          </button>
          <button
            className={styles.actionButton}
            onClick={() => deleteMutation.mutate(todo)}
          >
            <img
              src={deleteIcon}
              className={styles.iconButton}
              alt="delete Icon"
            />
          </button>
        </div>
      ))}

      {/*Открытие Модального окна для редактирования*/}
      {modalEdit.open && (
        <ModalEdit closeModal={closeModalEdit} item={modalEdit} />
      )}
    </div>
  );
}

export default TodoList;
