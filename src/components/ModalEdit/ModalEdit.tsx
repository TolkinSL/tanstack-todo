import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './ModalEdit.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../types/types';
import { apiPatchTodo } from '../../services/todoApi';

const modalRoot = document.querySelector('#modal-root');

interface ModalEditState {
  open: boolean;
  todo: Partial<Todo>;
}

interface ModalEditProps {
  closeModal: () => void;
  item: ModalEditState;
}

const ModalEdit: React.FC<ModalEditProps> = ({ closeModal, item }) => {
  React.useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const queryClient = useQueryClient();
  const [title, setTitle] = useState(item.todo.caption);
  const [description, setDescription] = useState(item.todo.description);

  console.log('Title - ' + title);

  const mutation = useMutation({
    mutationFn: apiPatchTodo,
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
        id: item.todo.id ?? Date.now(),
        caption: title ?? '',
        description: description ?? '',
        complete: false,
      };

      mutation.mutate(newTodo);
      closeModal();
    }
  };

  return createPortal(
    <>
      <div className={styles.modal}>
        <form className={styles.formStyle} onSubmit={handleSubmit}>
          <div>
            <h2 className={styles.caption}>Редактирование ToDo</h2>
            <div className={styles.lines}>Заголовок </div>
            <input
              type="text"
              className={styles.textInput}
              value={title}
              onChange={(evt) => setTitle(evt.target.value)}
              placeholder="Введите заголовок"
            />
            <div className={styles.lines}>Описание </div>
            <input
              type="text"
              className={styles.textInput}
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
              placeholder="Введите описание"
            />
          </div>
          <div className={styles.buttonSection}>
            <button className={styles.button} type="submit">
              Редактировать
            </button>
            <button className={styles.button} onClick={() => closeModal()}>
              Отменить
            </button>
          </div>
        </form>
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalRoot ?? document.body
  );
};

export default ModalEdit;
