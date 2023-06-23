import React from 'react';
import { Header } from './components/Header/Header';
import { TodoCreation } from './components/TodoCreation/TodoCreation';
import { TodoList } from './components/TodoList/TodoList';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

const defaultTodo = [
  { text: 'Complete online JavaScript course', completed: true },
  { text: 'Jog around the park 3x', completed: false },
  { text: 'Read for 1 hour', completed: false },
  { text: 'Pick up groceries', completed: false },
  { text: 'Complete Todo App on Frontend Mentor', completed: false },
];

function App() {
  return (
    <>
      <Header />
      <TodoCreation />
      <TodoList>
        {defaultTodo.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>
      <TodoFilter completed={''} total={''} />
    </>
  );
}

export default App;
