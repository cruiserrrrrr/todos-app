import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './checkbox';
import '@testing-library/jest-dom'; 
import { ICheckbox } from '../../services/types/global';

describe('Checkbox component', () => {
  const defaultProps: ICheckbox = {
    for: 'testCheckbox',
    checked: false,
    onChange: jest.fn(),
  };

  test('renders without crashing', () => {
    render(<Checkbox {...defaultProps} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

  test('renders with correct initial state', () => {
    const props: ICheckbox = {
      ...defaultProps,
      checked: true,
    };
    render(<Checkbox {...props} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeChecked();
  });

  test('calls onChange when clicked', () => {
    render(<Checkbox {...defaultProps} />);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test('toggles checked state when clicked', () => {
    const { rerender } = render(<Checkbox {...defaultProps} />);
    const checkboxElement = screen.getByRole('checkbox');

    // Check initial state
    expect(checkboxElement).not.toBeChecked();

    // Simulate click and re-render with checked state
    fireEvent.click(checkboxElement);
    rerender(<Checkbox {...defaultProps} checked={true} />);
    expect(checkboxElement).toBeChecked();
  });
});
