import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewTodo from './new-todo';
import '@testing-library/jest-dom';
import { INewTodo } from '../../services/types/global';

describe('NewTodo component', () => {
  const defaultProps: INewTodo = {
    isAdded: false,
    handleAddTodo: jest.fn(),
    inputValue: '',
    setInputValue: jest.fn(),
    error: false,
  };

  test('renders without crashing', () => {
    render(<NewTodo {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Что будем делать?');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders with correct initial state', () => {
    const props: INewTodo = {
      ...defaultProps,
      inputValue: 'Test Todo',
    };
    render(<NewTodo {...props} />);
    const inputElement = screen.getByDisplayValue('Test Todo');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls setInputValue when input changes', () => {
    render(<NewTodo {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Что будем делать?');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(defaultProps.setInputValue).toHaveBeenCalledWith('New Value');
  });

  test('calls handleAddTodo when button is clicked', () => {
    render(<NewTodo {...defaultProps} />);
    const buttonElement = screen.getByText('Добавить');
    fireEvent.click(buttonElement);
    expect(defaultProps.handleAddTodo).toHaveBeenCalled();
  });

  test('displays error messages when error is present', () => {
    const props: INewTodo = {
      ...defaultProps,
      error: 'Sample Error',
      inputValue: '12345678901234567',
    };
    render(<NewTodo {...props} />);
    expect(screen.getByText('хочешь больше? плати')).toBeInTheDocument();
    expect(screen.getByText('Лимит 16 символов, сейчас 17')).toBeInTheDocument();
  });

  test('applies correct class names based on props', () => {
    const props: INewTodo = {
      ...defaultProps,
      isAdded: true,
      error: true,
    };
    render(<NewTodo {...props} />);
    const inputElement = screen.getByPlaceholderText('Что будем делать?');
    expect(inputElement).toHaveClass('input');
    expect(inputElement).toHaveClass('error');
  });
});
