/// <reference types="vite/client" />

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

type ResponseTodos = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
