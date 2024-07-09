import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodosWrapper from './todos-wrapper';
import { addTodo } from '../../services/redux/slices/todoSlice';

// Создание мокового стора
const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;

beforeEach(() => {
    store = mockStore({
        todo: {
            todos: [], // Убедитесь, что поле todos присутствует
            allTodos: [],
            completedTodos: [],
            uncompletedTodos: []
        }
    });

    store.dispatch = jest.fn();
});

test('renders TodosWrapper component', () => {
    render(
        <Provider store={store}>
            <TodosWrapper />
        </Provider>
    );

    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByTitle('Все')).toBeInTheDocument();
    expect(screen.getByTitle('Выполнено')).toBeInTheDocument();
    expect(screen.getByTitle('Активно')).toBeInTheDocument();
});

test('adds a new todo', () => {
    render(
        <Provider store={store}>
            <TodosWrapper />
        </Provider>
    );

    fireEvent.click(screen.getByText('Добавить'));
    fireEvent.change(screen.getByPlaceholderText('Что будем делать?'), { target: { value: 'Новое задание' } });
    fireEvent.click(screen.getByText('точно?'));

    expect(store.dispatch).toHaveBeenCalledWith(addTodo({
        text: 'Новое задание'
    }));
});

test('switches between all, completed, and active todos', () => {
    store = mockStore({
        todo: {
            todos: [
                { id: 1, text: 'Test Todo', completed: false },
                { id: 2, text: 'Completed Todo', completed: true }
            ],
            allTodos: [{ id: 1, text: 'Test Todo', completed: false }, { id: 2, text: 'Completed Todo', completed: true }],
            completedTodos: [{ id: 2, text: 'Completed Todo', completed: true }],
            uncompletedTodos: [{ id: 1, text: 'Test Todo', completed: false }]
        }
    });

    render(
        <Provider store={store}>
            <TodosWrapper />
        </Provider>
    );

    fireEvent.click(screen.getByTitle('Все'));
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Completed Todo')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Выполнено'));
    expect(screen.getByText('Completed Todo')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo')).toBeNull();

    fireEvent.click(screen.getByTitle('Активно'));
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed Todo')).toBeNull();
});
