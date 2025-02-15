// import { useState } from 'react';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NewTodo from './components/NewTodo/NewTodo.tsx';
import TodoList from './components/TodoList/TodoList.tsx';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="App" style={{ width: '640px', margin: '0 auto' }}>
        <h2>Hello ToDo</h2>
        <NewTodo />
        <TodoList />
        <ReactQueryDevtools initialIsOpen />
      </div>
    </>
  );
}

export default App;
