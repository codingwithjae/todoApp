import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoCreation } from './components/TodoCreation/TodoCreation';
import { TodoList } from './components/TodoList/TodoList';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoCounter } from './components/TodoCounter/TodoCounter';

const defaultTodos = [
  { text: 'Complete online JavaScript course', completed: true },
  { text: 'Jog around the park 3x', completed: true },
  { text: 'Read for 1 hour', completed: true },
  { text: 'Pick up groceries', completed: false },
  { text: 'Complete Todo App on Frontend Mentor', completed: false },
];

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [filteredTodos, setFilteredTodos] = useState(defaultTodos);

  const completeTodo = (text) => {
    const newTodos = todos.map((todo) => {
      if (todo.text === text) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = todos.filter((todo) => todo.text !== text);
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const handleFilterChange = (filter) => {
    if (filter === 'all') {
      setFilteredTodos(todos);
    } else if (filter === 'active') {
      setFilteredTodos(todos.filter((todo) => !todo.completed));
    } else if (filter === 'completed') {
      setFilteredTodos(todos.filter((todo) => todo.completed));
    }
  };

  const addTodo = (text) => {
    const newTodo = { text: text, completed: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const remainingTodos = totalTodos - completedTodos;

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  return (
    <>
      <Header />
      <TodoCreation addTodo={addTodo} />
      <TodoList>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index} 
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
        <TodoCounter remaining={remainingTodos} clear={clearCompleted} applyFilter={handleFilterChange} />
      </TodoList>
      <TodoFilter applyFilter={handleFilterChange} />
    </>
  );
}

export default App;
