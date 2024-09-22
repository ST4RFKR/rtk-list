import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

const initialState = {
  tasks: [
    {
      id: v1(),
      title: 'Сделать утреннюю зарядку',
      isDone: false,
    },
    {
      id: v1(),
      title: 'Почитать книгу',
      isDone: true,
    },
    {
      id: v1(),
      title: 'Написать отчет по проекту',
      isDone: false,
    },
  ],
  inputValue: '',
  filter: 'all',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    removeTasks: (state, action) => {
      state.tasks = state.tasks.filter((obj: any) => obj.id !== action.payload);
    },
    addTasks: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setChecked: (state, action) => {
      const task = state.tasks.find((el: any) => el.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeTasks, addTasks, setInputValue, setFilter, setChecked } = todoSlice.actions;

export default todoSlice.reducer;
