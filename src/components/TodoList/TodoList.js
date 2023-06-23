import './TodoList.css';

function TodoList({ children }) {
  return (
    <section className="todoList">
      <div className="todoListContainer">
        <ul>
          {children}
        </ul>
      </div>
    </section>
  );
}

export { TodoList };

