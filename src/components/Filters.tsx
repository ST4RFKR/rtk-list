import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/slice/todoSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: any) => state.todo.filter);

  return (
    <div className="filters">
      <button
        onClick={() => dispatch(setFilter('all'))}
        className={filter === 'all' ? 'active' : ''}>
        All
      </button>
      <button
        onClick={() => dispatch(setFilter('active'))}
        className={filter === 'active' ? 'active' : ''}>
        Active
      </button>
      <button
        onClick={() => dispatch(setFilter('completed'))}
        className={filter === 'completed' ? 'active' : ''}>
        Completed
      </button>
    </div>
  );
};

export default Filters;
