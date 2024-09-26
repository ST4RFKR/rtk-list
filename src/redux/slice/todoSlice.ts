import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { v1 } from 'uuid';

interface Task {
  id: number;
  title: string;
  isDone: boolean;
}
export const fetchTasks = createAsyncThunk('todo/fetchTasks', async () => {
  const response = await axios.get('https://66f035def2a8bce81be55030.mockapi.io/tasks');
  console.log(response.data);

  return response.data;
});

const initialState = {
  tasks: [] as Task[],
  inputValue: '',
  filter: 'all',
  status: 'idle',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    removeTasks: (state, action) => {
      state.tasks = state.tasks.filter((obj: any) => obj.id !== action.payload);
    },
    addTasks: (state, action) => {
      state.tasks = action.payload;
      state.inputValue = '';
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
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.status = 'success';
    });
  },
});

// Action creators are generated for each case reducer function
export const { removeTasks, addTasks, setInputValue, setFilter, setChecked, setTasks } =
  todoSlice.actions;

export default todoSlice.reducer;
