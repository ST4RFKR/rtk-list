// /src/components/AddTodo.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTasks, fetchTasks, setInputValue } from '../redux/slice/todoSlice';
import { v1 } from 'uuid';
import axios from 'axios';

const AddTodo: React.FC = () => {
  const value = useSelector((state: any) => state.todo.inputValue);
  const [error, setError] = React.useState(false);

  const dispatch: any = useDispatch();

  const addNewTasks = async (e: any) => {
    e.preventDefault();

    const newTask = { id: v1(), title: value.trim(), isDone: false };
    if (value.length === 0) return;

    try {
      await axios.post('https://66f035def2a8bce81be55030.mockapi.io/tasks', newTask);
      dispatch(fetchTasks());
    } catch (error) {}
    dispatch(setInputValue(''));
  };
  const onChangetInput = (e: any) => {
    dispatch(setInputValue(e.target.value));
  };
  const onClickClear = () => {
    dispatch(setInputValue(''));
  };

  return (
    <form className="form">
      <div className="form__wrapper">
        <input value={value} onChange={onChangetInput} type="text" placeholder={'Add task...'} />
        {value && (
          <svg
            onClick={onClickClear} // Очистка по клику на иконку
            className="clearIcon"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        )}
        <button onClick={addNewTasks} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
