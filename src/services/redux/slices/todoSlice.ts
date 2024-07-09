// src/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: []
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string }>) => {
      const newTodo: Todo = {
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    updateTodo: (state, action: PayloadAction<{ id: string, text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { addTodo, deleteTodo, updateTodo, toggleTodo } = todoSlice.actions;
export const completedTodos = (state: { todo: TodoState }) => state.todo.todos.filter(todo => todo.completed);
export const uncompletedTodos = (state: { todo: TodoState }) => state.todo.todos.filter(todo => !todo.completed);
export const allTodos = (state: { todo: TodoState }) => state.todo.todos;
export default todoSlice.reducer;
