import React from 'react';

import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Filters from './components/Filters';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <AddTodo />
      <TodoList />
      <Filters />
    </div>
  );
}

export default App;
