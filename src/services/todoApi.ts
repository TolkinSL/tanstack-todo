import { Todo } from '../types/types';

export async function apiSaveTodo(newTodo: Todo): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const localTodos = sessionStorage.getItem('todosTolkin');
      const listTodos: Todo[] = localTodos ? JSON.parse(localTodos) : [];
      listTodos.push(newTodo);
      sessionStorage.setItem('todosTolkin', JSON.stringify(listTodos));

      resolve();
    }, 250);
  });
}

export async function saveTodo(newTodo: Todo) {
  try {
    await apiSaveTodo(newTodo);
  } catch {
    console.error('Ошибка в записи Todo ');
    throw new Error('Ошибка в записи Todo');
  }
}

export async function apiLoadTodo(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const localTodos = sessionStorage.getItem('todosTolkin');
      const parseTodos: Todo[] = localTodos ? JSON.parse(localTodos) : [];

      resolve(parseTodos);
    }, 250);
  });
}

export async function apiPatchTodo(updateTodo: Todo): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const localTodos = sessionStorage.getItem('todosTolkin');
      const parseTodos: Todo[] = localTodos ? JSON.parse(localTodos) : [];

      const newTodo = parseTodos.map((item) => {
        if (item.id === updateTodo.id) {
          return updateTodo;
        }

        return item;
      });

      sessionStorage.setItem('todosTolkin', JSON.stringify(newTodo));
      resolve();
    }, 250);
  });
}

export async function apiDeleteTodo(deleteTodo: Todo): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const localTodos = sessionStorage.getItem('todosTolkin');
      const parseTodos: Todo[] = localTodos ? JSON.parse(localTodos) : [];

      const newTodo = parseTodos.filter((item) => {
        if (item.id === deleteTodo.id) {
          return false;
        }

        return true;
      });

      sessionStorage.setItem('todosTolkin', JSON.stringify(newTodo));
      resolve();
    }, 250);
  });
}
