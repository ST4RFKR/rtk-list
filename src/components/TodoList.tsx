// /src/components/TodoList.tsx
import React from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todo.tasks);
  const filter = useSelector((state: any) => state.todo.filter);

  const filteredTodos = todos.filter((el: any) => {
    if (filter === 'active') return !el.isDone;
    if (filter === 'completed') return el.isDone;
    return true;
  });
  console.log(filteredTodos);

  if (!filteredTodos.length) {
    return <b className={'b'}>Задач нет...</b>;
  }
  return (
    <div>
      {filteredTodos.map((todo: any) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.title} completed={todo.isDone} />
      ))}
    </div>
  );
};

export default TodoList;
