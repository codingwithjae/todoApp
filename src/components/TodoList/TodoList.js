import './TodoList.css';

function TodoList({ children }) {
  return (
    <section className="todoList">
        <ul>
          {children}
        </ul>
    </section>
  );
}

export { TodoList };

