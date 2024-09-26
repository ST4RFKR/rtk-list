// /src/components/AddTodo.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTasks, fetchTasks, setInputValue } from '../redux/slice/todoSlice';
import { v1 } from 'uuid';
import axios from 'axios';

const AddTodo: React.FC = () => {
  const value = useSelector((state: any) => state.todo.inputValue);

  const dispatch: any = useDispatch();

  const addNewTasks = async (e: any) => {
    e.preventDefault();

    const newTask = { id: v1(), title: value.trim(), isDone: false };
    if (value.length === 0) return;

    try {
      const response = await axios.post(
        'https://66f035def2a8bce81be55030.mockapi.io/tasks',
        newTask,
        dispatch(setInputValue('')),
      );
      dispatch(fetchTasks());
      console.log('Задача добавлена:', response.data);
    } catch (error) {}
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
