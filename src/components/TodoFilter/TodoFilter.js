import React, { useState } from 'react';
import './TodoFilter.css';

function TodoFilter({ applyFilter }) {
  const [filter, setFilter] = useState('all');

  return (
    <>
      <section className='footerFilterContainer'>
        <div
          className={`footerSubContainerOne ${filter === 'all' ? 'active' : ''}`}
          onClick={() => {
            setFilter('all');
            applyFilter('all');
          }}
        >
          <p>All</p>
        </div>
        <div
          className={`footerSubContainerTwo ${filter === 'active' ? 'active' : ''}`}
          onClick={() => {
            setFilter('active');
            applyFilter('active');
          }}
        >
          <p>Active</p>
        </div>
        <div
          className={`footerSubContainerThree ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => {
            setFilter('completed');
            applyFilter('completed');
          }}
        >
          <p>Completed</p>
        </div>
      </section>
      <div className='footerSubContainerFour'>
        <p>Drag and drop to reorder list</p>
      </div>
    </>
  );
}

export { TodoFilter };
