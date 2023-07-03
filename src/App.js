import React, { createContext, useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { TodoCreation } from './components/TodoCreation/TodoCreation';
import { TodoList } from './components/TodoList/TodoList';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoCounter } from './components/TodoCounter/TodoCounter';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = useState(parsedItem);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return [item, saveItem];
}

function App() {
  const [todos, setTodos] = useLocalStorage('Todos_V1', []);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
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
    setTodos(newTodos);
  };

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const remainingTodos = totalTodos - completedTodos;

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
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
