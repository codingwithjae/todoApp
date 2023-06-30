import React from 'react';
import xIcon from '../../assets/icon-cross.svg';
import iconCheck from '../../assets/icon-check.svg';
import './TodoItem.css';

function TodoItem(props) {
  return (
    <li className='itemContainers'>
      <span
        className={`iconCheckContainer ${props.completed ? "iconCheckContainer--Active" : ""}`}
        onClick={props.onComplete}
      >
        {props.completed && <img className='iconCheck' src={iconCheck} alt='checkIcon' />}
      </span>
      <span className='textContainer'>
        <p className={`itemTextP ${props.completed ? "itemTextP--Completed" : ""}`}>
          {props.text}
        </p>
      </span>
      <span>
        <img className='deleteIcon' src={xIcon} alt="xIcon" onClick={props.onDelete} />
      </span>
    </li>
  );
}

export { TodoItem };
