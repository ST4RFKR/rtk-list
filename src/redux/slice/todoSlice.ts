import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import { newTaskType } from '../../components/AddTodo';

interface Task {
  id: number | string;
  title: string;
  isDone: boolean;
}
export const fetchTasks = createAsyncThunk('todo/fetchTasks', async () => {
  const response = await axios.get('https://66f035def2a8bce81be55030.mockapi.io/tasks');
  return response.data;
});
export const removeTaskAction = createAsyncThunk('todo/removeTasks', async (id: number) => {
  await axios.delete(`https://66f035def2a8bce81be55030.mockapi.io/tasks/${id}`);
  return id;
});
export const addTaskAction = createAsyncThunk(
  'users/fetchByIdStatus',
  async (newTask: newTaskType) => {
    const response = await axios.post('https://66f035def2a8bce81be55030.mockapi.io/tasks', newTask);
    console.log(response.data);

    return response.data;
  },
);

const initialState = {
  tasks: [] as Task[],
  inputValue: '',
  filter: 'all',
  statusFetch: 'idle',
  statusRemove: 'idle',
  statusAdd: 'idle',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // removeTasks: (state, action) => {
    //   state.tasks = state.tasks.filter((obj: any) => obj.id !== action.payload);
    // },
    // addTasks: (state, action) => {
    //   state.tasks = action.payload;
    //   state.inputValue = '';
    // },
    setInputValue: (state, action) => {
      console.log(state.inputValue);

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
    // setTasks: (state, action) => {
    //   state.tasks = action.payload;
    // },
    resetStatusAdd: (state) => {
      state.statusAdd = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.statusFetch = 'loading';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.statusFetch = 'success';
    });
    builder.addCase(removeTaskAction.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.statusRemove = 'success';
    });
    builder.addCase(addTaskAction.pending, (state) => {
      state.statusAdd = 'loading';
    });
    builder.addCase(addTaskAction.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, action.payload];
      state.statusAdd = 'success';
    });
  },
});

export const { setInputValue, setFilter, setChecked, resetStatusAdd } = todoSlice.actions;

export default todoSlice.reducer;
