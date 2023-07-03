import React, { createContext, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoCreation } from './components/TodoCreation/TodoCreation';
import { TodoList } from './components/TodoList/TodoList';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoCounter } from './components/TodoCounter/TodoCounter';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => { }
});

function App() {

  const localStorageTodos = localStorage.getItem('Todos_V1');

  let parsedItems;

  if (!localStorageTodos) {
    localStorage.setItem('Todos_V1', JSON.stringify([]));
    parsedItems = [];
  } else {
    parsedItems = JSON.parse(localStorageTodos);
  }

  const [todos, setTodos] = useState(parsedItems);
  const [filteredTodos, setFilteredTodos] = useState(parsedItems);

  const saveTodos = (newTodos) => {
    localStorage.setItem('Todos_V1', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    saveTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(newTodos);
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
    const newTodo = { id: Date.now().toString(), text: text, completed: false };
    const newTodos = [...todos, newTodo];
    saveTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const remainingTodos = totalTodos - completedTodos;

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    saveTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...filteredTodos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFilteredTodos(items);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div className='App' id={theme}>
            <Header />
            <TodoCreation addTodo={addTodo} />

            <TodoList>
              <Droppable droppableId="todo-list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredTodos.map((todo, index) => (
                      <Draggable key={todo.id} draggableId={todo.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TodoItem
                              text={todo.text}
                              completed={todo.completed}
                              onComplete={() => completeTodo(todo.id)}
                              onDelete={() => deleteTodo(todo.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <TodoCounter remaining={remainingTodos} clear={clearCompleted} applyFilter={handleFilterChange} />
            </TodoList>
            <TodoFilter applyFilter={handleFilterChange} />
          </div>
        </ThemeContext.Provider>
      </DragDropContext>
    </>
  );
}

export default App;
