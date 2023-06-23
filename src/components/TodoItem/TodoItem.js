import './TodoItem.css';
import xIcon from '../../assets//icon-cross.svg';
import checkIcon from '../../assets//icon-check.svg';

function TodoItem(props) {
  return (
    <div className='itemsContainers'>
      <li>
        <span><img className='checkIcon' src={checkIcon} alt="checkIcon" /></span>
        <p className='itemText'>{props.text}</p>
        <span><img className='xIcon' src={xIcon} alt="xIcon" /></span>
      </li>
    </div>
  );
}

export { TodoItem };