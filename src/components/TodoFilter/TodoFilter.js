import './TodoFilter.css';

function TodoFilter({ total, completed }) {
  return (
    <>
      <section className='footerFilterContainer'>
        <div className='footerSubContainerOne'>
          <p>
            All {completed} {total}
          </p>
        </div>
        <div className='footerSubContainerTwo'>
          <p>
            Active {completed} {total}
          </p>
        </div>
        <div className='footerSubContainerThree'>
          <p>
            Completed {completed} {total}
          </p>
        </div>
      </section>
      <div className='footerSubContainerFour'>
        <p>
          Drag and drop to reorder list
        </p>
      </div>
    </>
  );
}

export { TodoFilter };
