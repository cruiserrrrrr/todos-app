import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button';
import '@testing-library/jest-dom';
import { IButton } from '../../services/types/global';

describe('Button component', () => {
    const defaultProps: IButton = {
        className: '',
        onClick: jest.fn(),
        text: 'Click me',
    };

    test('renders without crashing', () => {
        render(<Button {...defaultProps} />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('renders with correct text', () => {
        render(<Button {...defaultProps} />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveTextContent('Click me');
    });

    test('calls onClick when clicked', () => {
        render(<Button {...defaultProps} />);
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    test('applies the given className', () => {
        const props: IButton = {
            ...defaultProps,
            className: 'extra-class',
        };
        render(<Button {...props} />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('extra-class');
    });
});
