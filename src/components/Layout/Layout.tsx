// import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styles from './Layout.module.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NewTodo from '../NewTodo/NewTodo.tsx';
import TodoList from '../TodoList/TodoList.tsx';
import { Outlet } from 'react-router-dom';

function Layout() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className={styles.main}>
        <h2 className={styles.mainCaption}>Hello ToDo</h2>
        {/* <NewTodo /> */}
        <Outlet />
        {/* <TodoList /> */}
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </div>
    </>
  );
}

export default Layout;
