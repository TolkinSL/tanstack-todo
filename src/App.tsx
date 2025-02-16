// import { useState } from 'react';
import styles from './App.module.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NewTodo from './components/NewTodo/NewTodo.tsx';
import TodoList from './components/TodoList/TodoList.tsx';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className={styles.main}>
        <h2 className={styles.mainCaption}>Hello ToDo</h2>
        <NewTodo />
        <TodoList />
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </div>
    </>
  );
}

export default App;
