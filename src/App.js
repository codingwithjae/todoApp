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

const defaultTodos = [
  { id: '1', text: 'Complete online JavaScript course', completed: true },
  { id: '2', text: 'Jog around the park 3x', completed: false },
  { id: '3', text: 'Read for 1 hour', completed: false },
  { id: '4', text: 'Pick up groceries', completed: false },
  { id: '5', text: 'Complete Todo App on Frontend Mentor', completed: false },
];

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [filteredTodos, setFilteredTodos] = useState(defaultTodos);

  // Marks a todo as completed or not completed
  const completeTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  // Deletes a todo from the list
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  // Handles the filter change for displaying todos
  const handleFilterChange = (filter) => {
    if (filter === 'all') {
      setFilteredTodos(todos);
    } else if (filter === 'active') {
      setFilteredTodos(todos.filter((todo) => !todo.completed));
    } else if (filter === 'completed') {
      setFilteredTodos(todos.filter((todo) => todo.completed));
    }
  };

  // Adds a new todo to the list
  const addTodo = (text) => {
    const newTodo = { id: Date.now().toString(), text: text, completed: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const remainingTodos = totalTodos - completedTodos;

  // Clears all completed todos from the list
  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Handles the end of a drag-and-drop operation
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
              {/* Provides a droppable area for the todo list */}
              <Droppable droppableId="todo-list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {/* Renders each todo item as a draggable component */}
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
