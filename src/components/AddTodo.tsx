// /src/components/AddTodo.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTasks, setInputValue } from '../redux/slice/todoSlice';
import { v1 } from 'uuid';

const AddTodo: React.FC = () => {
  const value = useSelector((state: any) => state.todo.inputValue);
  const dispatch = useDispatch();

  const addNewTasks = (e: any) => {
    e.preventDefault();
    const newTask = { id: v1(), title: value, isDone: false };
    dispatch(addTasks(newTask));
  };
  const onChangetInput = (e: any) => {
    dispatch(setInputValue(e.target.value));
  };
  return (
    <form>
      <input value={value} onChange={onChangetInput} type="text" placeholder="Add a todo" />
      <button onClick={addNewTasks} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddTodo;
