import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Todo from './todo';
import '@testing-library/jest-dom';
import { ITodo } from '../../services/types/global';
import { deleteTodo, toggleTodo, updateTodo } from '../../services/redux/slices/todoSlice';

const mockStore = configureStore([]);

describe('Todo component', () => {
    const defaultProps: ITodo = {
        id: '1',
        text: 'Test Todo',
        completed: false,
    };

    let store: ReturnType<typeof mockStore>;
    let component;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn();

        component = render(
            <Provider store={store}>
                <Todo {...defaultProps} />
            </Provider>
        );
    });

    test('renders without crashing', () => {
        const todoElement = screen.getByText('Test Todo');
        expect(todoElement).toBeInTheDocument();
    });

    test('displays the correct initial text', () => {
        const todoElement = screen.getByText('Test Todo');
        expect(todoElement).toBeInTheDocument();
    });

    test('toggles the completion state when checkbox is clicked', () => {
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(store.dispatch).toHaveBeenCalledWith(toggleTodo({ id: '1' }));
    });

    test('deletes the todo when delete button is clicked', () => {
        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);
        expect(store.dispatch).toHaveBeenCalledWith(deleteTodo({ id: '1' }));
    });

    test('enters edit mode when edit button is clicked', () => {
        const editButton = screen.getByTestId('edit-button');
        fireEvent.click(editButton);
        const input = screen.getByDisplayValue('Test Todo');
        expect(input).toBeInTheDocument();
    });

    test('updates the todo text when in edit mode and check button is clicked', () => {
        const editButton = screen.getByTestId('edit-button');
        fireEvent.click(editButton);
        const input = screen.getByDisplayValue('Test Todo');
        fireEvent.change(input, { target: { value: 'Updated Todo' } });
        const checkButton = screen.getByTestId('edit-button');
        fireEvent.click(checkButton);
        expect(store.dispatch).toHaveBeenCalledWith(updateTodo({ id: '1', text: 'Updated Todo' }));
    });

    test('shows error message when text length exceeds 16 characters', () => {
        const editButton = screen.getByTestId('edit-button');
        fireEvent.click(editButton);
        const input = screen.getByDisplayValue('Test Todo');
        fireEvent.change(input, { target: { value: 'This is a very long todo text' } });
        const checkButton = screen.getByTestId('edit-button');
        fireEvent.click(checkButton);
        const errorMessage = screen.getByText('Неа, максимум 16 символов');
        expect(errorMessage).toBeInTheDocument();
    });
});
