// import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styles from './App.module.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NewTodo from './components/NewTodo/NewTodo.tsx';
import TodoList from './components/TodoList/TodoList.tsx';
import Layout from './components/Layout/Layout.tsx';
import TodoInfo from './components/TodoInfo/TodoInfo.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/',
        Component: TodoList,
      },
      {
        path: 'todo/:id',
        Component: TodoInfo,
      },
    ],
  },
]);

function App() {
  // const [count, setCount] = useState(0);

  return (
    // <>
    //   <div className={styles.main}>
    //     <h2 className={styles.mainCaption}>Hello ToDo</h2>
    //     <NewTodo />
    //     <TodoList />
    //     {/* <ReactQueryDevtools initialIsOpen /> */}
    //   </div>
    // </>
    <RouterProvider router={router} />
  );
}

export default App;
