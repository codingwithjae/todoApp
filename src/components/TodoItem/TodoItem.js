import './TodoItem.css';
import xIcon from '../../assets//icon-cross.svg';
import { BsFillCheckCircleFill } from "react-icons/bs";

function TodoItem(props) {
  return (
    <div className='itemsContainers'>
      <li>
        
        <p className='itemText'>{props.text}</p>
        <span><img className='xIcon' src={xIcon} alt="xIcon" /></span>
      </li>

    </div>
  );
}

export { TodoItem };