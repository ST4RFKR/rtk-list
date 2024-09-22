// /src/components/TodoItem.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTasks, setChecked } from '../redux/slice/todoSlice';

interface TodoItemProps {
  text: string;
  completed: boolean;
  id: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(removeTasks(id));
  };
  const toggleTask = () => {
    dispatch(setChecked(id));
  };
  return (
    <div className="todo-item">
      <input type="checkbox" checked={completed} onChange={toggleTask} />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</span>
      <button onClick={removeTask}>Remove</button>
    </div>
  );
};

export default TodoItem;
