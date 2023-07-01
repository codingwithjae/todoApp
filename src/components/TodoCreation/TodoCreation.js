import React, { useState } from 'react';
import './TodoCreation.css';

function TodoCreation({ addTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <form className="todoCreation">
      <span className='circleIcon'></span>
      <input
        type="text"
        id="taskInput"
        value={newTodo}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo..."
      />
    </form>
  );
}

export { TodoCreation };
