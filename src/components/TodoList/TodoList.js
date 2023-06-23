import './TodoList.css';

function TodoList({ children }) {
  return (
    <section className="todoList">
      <div className="todoListContainer">
        <ul>
          {children}
        </ul>
      </div>
      <span className='itemsCount'><p>5 items left</p></span>
      <span className='clearItems'><p>Clear completed</p></span>
    </section>
  );
}

export { TodoList };

