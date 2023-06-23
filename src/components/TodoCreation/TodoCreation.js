import './TodoCreation.css';
import checkIcon from'../../assets//icon-check.svg';

function TodoCreation() {
  return (
    <div className="todoCreation">
      <span><img className='checkIconHeader' src={checkIcon} alt="checkIcon" /></span>
      <input className='placeholder' placeholder="Create a new todo..." />
    </div>
  );
}

export { TodoCreation };
