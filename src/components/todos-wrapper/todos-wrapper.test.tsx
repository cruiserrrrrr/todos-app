import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodosWrapper from './todos-wrapper';
import '@testing-library/jest-dom';
import { addTodo } from '../../services/redux/slices/todoSlice';

const mockStore = configureStore([]);

describe('TodosWrapper component', () => {
  let store: ReturnType<typeof mockStore>;
  let component;

  beforeEach(() => {
    store = mockStore({
      todos: {
        allTodos: [
          { id: '1', text: 'Test Todo 1', completed: false },
          { id: '2', text: 'Test Todo 2', completed: true }
        ],
        completedTodos: [
          { id: '2', text: 'Test Todo 2', completed: true }
        ],
        uncompletedTodos: [
          { id: '1', text: 'Test Todo 1', completed: false }
        ]
      }
    });
    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <TodosWrapper />
      </Provider>
    );
  });

  test('renders without crashing', () => {
    const headerElement = screen.getByText('Todo');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders empty state when there are no todos', () => {
    store = mockStore({
      todos: {
        allTodos: [],
        completedTodos: [],
        uncompletedTodos: []
      }
    });
    component = render(
      <Provider store={store}>
        <TodosWrapper />
      </Provider>
    );

    const emptyElement = screen.getByText('Нет тудушек');
    expect(emptyElement).toBeInTheDocument();
  });

  test('toggles the new todo input when the add button is clicked', () => {
    const addButton = screen.getByText('Добавить');
    fireEvent.click(addButton);
    const confirmButton = screen.getByText('точно?');
    expect(confirmButton).toBeInTheDocument();
  });

  test('adds a new todo when the input value is valid and confirmed', () => {
    const addButton = screen.getByText('Добавить');
    fireEvent.click(addButton);
    const input = screen.getByPlaceholderText('Что будем делать?');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    const confirmButton = screen.getByText('точно?');
    fireEvent.click(confirmButton);
    expect(store.dispatch).toHaveBeenCalledWith(addTodo({ text: 'New Todo' }));
  });

  test('shows error message when new todo value exceeds 16 characters', () => {
    const addButton = screen.getByText('Добавить');
    fireEvent.click(addButton);
    const input = screen.getByPlaceholderText('Что будем делать?');
    fireEvent.change(input, { target: { value: 'This is a very long todo text' } });
    const confirmButton = screen.getByText('точно?');
    fireEvent.click(confirmButton);
    const errorMessage = screen.getByText('Неа, максимум 16 символов');
    expect(errorMessage).toBeInTheDocument();
  });

  test('sorts todos when the sort buttons are clicked', () => {
    const allButton = screen.getByTitle('Все');
    const completedButton = screen.getByTitle('Выполнено');
    const activeButton = screen.getByTitle('Активно');
    
    fireEvent.click(allButton);
    const allTodosText = screen.getByText('Test Todo 1');
    expect(allTodosText).toBeInTheDocument();

    fireEvent.click(completedButton);
    const completedTodoText = screen.getByText('Test Todo 2');
    expect(completedTodoText).toBeInTheDocument();

    fireEvent.click(activeButton);
    const activeTodoText = screen.getByText('Test Todo 1');
    expect(activeTodoText).toBeInTheDocument();
  });
});
