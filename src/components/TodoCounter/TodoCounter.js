import React, { useState } from 'react';
import './TodoCounter.css';

function TodoCounter({ remaining, clear, applyFilter }) {

  const [filter, setFilter] = useState('all');

  return (
    <section>
      <div className="counterContainerMobile">
        <span className="itemsCount">
          <p>{remaining} items left</p>
        </span>
        <span className="clearItems">
          <p onClick={clear}>Clear completed</p>
        </span>
      </div>

      <div className="counterContainerDesktop">
        <span className="itemsCount">
          <p>{remaining} items left</p>
        </span>
        <span
          className={`footerSubContainerOne ${filter === 'all' ? 'active' : ''}`}
          onClick={() => {
            setFilter('all');
            applyFilter('all');
          }}
        >
          <p>All</p>
        </span>
        <span
          className={`footerSubContainerTwo ${filter === 'active' ? 'active' : ''}`}
          onClick={() => {
            setFilter('active');
            applyFilter('active');
          }}
        >
          <p>Active</p>
        </span>
        <span
          className={`footerSubContainerThree ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => {
            setFilter('completed');
            applyFilter('completed');
          }}
        >
          <p>Completed</p>
        </span>

        <span className="clearItems">
          <p onClick={clear}>Clear completed</p>
        </span>

      </div>
    </section>


  );
}

export { TodoCounter };
