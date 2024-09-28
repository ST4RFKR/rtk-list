// /src/components/TodoList.tsx
import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/slice/todoSlice';
import Skeleton from './Skeleton';

const TodoList: React.FC = () => {
  const dispatch: any = useDispatch();
  const todos = useSelector((state: any) => state.todo.tasks);
  const filter = useSelector((state: any) => state.todo.filter);
  const status = useSelector((state: any) => state.todo.statusFetch);

  // const getTasks = () => {

  // };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTodos = todos.filter((el: any) => {
    if (filter === 'active') return !el.isDone;
    if (filter === 'completed') return el.isDone;
    return true;
  });
  const skeletonJSX = [...new Array(4)].map((_, idx) => <Skeleton key={idx} />);
  const tasksJSX = filteredTodos.map((todo: any) => (
    <TodoItem key={todo.id} id={todo.id} text={todo.title} completed={todo.isDone} />
  ));

  // if (!filteredTodos.length) {
  //   return <b className={'b'}>Задач нет...</b>;
  // }
  return <div>{status === 'loading' ? skeletonJSX : tasksJSX}</div>;
  // if (status === 'loading') {
  //   return { skeletonJSX };
  // }
  // if (status === 'success') {
  //   return { tasksJSX };
  // }
};

export default TodoList;
