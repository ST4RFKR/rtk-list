// /src/components/TodoItem.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTaskAction, setChecked } from '../redux/slice/todoSlice';
import axios from 'axios';

interface TodoItemProps {
  text: string;
  completed: boolean;
  id: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
  const dispatch: any = useDispatch();

  const removeTask = () => {
    dispatch(removeTaskAction(id));
  };
  const toggleTask = async () => {
    try {
      const updatedTask = { isDone: !completed };
      await axios.put(`https://66f035def2a8bce81be55030.mockapi.io/tasks/${id}`, updatedTask);
    } catch (error) {}
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
