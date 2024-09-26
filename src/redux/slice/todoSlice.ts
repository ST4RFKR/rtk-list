import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { v1 } from 'uuid';

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
// export const addTaskAction = createAsyncThunk<Task,Task>('todo/addTasks', async (newTask) => {
//   const response = await axios.post('https://66f035def2a8bce81be55030.mockapi.io/tasks', newTask);
//   return response.data;
// });

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
    // removeTasks: (state, action) => {
    //   state.tasks = state.tasks.filter((obj: any) => obj.id !== action.payload);
    // },
    addTasks: (state, action) => {
      state.tasks = action.payload;
      state.inputValue = '';
    },
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.status = 'success';
    });
    builder.addCase(removeTaskAction.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.status = 'success';
    });
    // builder.addCase(addTaskAction.fulfilled, (state: any, action) => {
    //   state.tasks = action.payload;
    //   state.inputValue = '';
    // });
  },
});

// Action creators are generated for each case reducer function
export const { addTasks, setInputValue, setFilter, setChecked } = todoSlice.actions;

export default todoSlice.reducer;
