import reducer, { addTodo, deleteTodo, updateTodo, toggleTodo, completedTodos, uncompletedTodos, allTodos } from './todoSlice';

describe('todoSlice', () => {
  const initialState = {
    todos: []
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addTodo', () => {
    const actual = reducer(initialState, addTodo({ text: 'новая туду' }));
    expect(actual.todos.length).toBe(1);
    expect(actual.todos[0].text).toBe('новая туду');
    expect(actual.todos[0].completed).toBe(false);
  });

  it('handle deleteTodo', () => {
    const todoState = {
      todos: [
        { id: '1', text: 'тест туду', completed: false }
      ]
    };
    const actual = reducer(todoState, deleteTodo({ id: '1' }));
    expect(actual.todos.length).toBe(0);
  });

  it('handle updateTodo', () => {
    const todoState = {
      todos: [{ id: '1', text: 'тест туду', completed: false }]
    };
    const actual = reducer(todoState, updateTodo({ id: '1', text: 'апдейт туду' }));
    expect(actual.todos[0].text).toBe('апдейт туду');
  });

  it('handle toggleTodo', () => {
    const todoState = {
      todos: [
        { id: '1', text: 'тест туду', completed: false }
      ]
    };
    const actual = reducer(todoState, toggleTodo({ id: '1' }));
    expect(actual.todos[0].completed).toBe(true);
  });

  it('select completedTodos', () => {
    const todoState = {
      todo: {
        todos: [
          { id: '1', text: 'комплитет туду', completed: true },
          { id: '2', text: 'актив туду', completed: false }
        ]
      }
    };
    expect(completedTodos(todoState))
      .toEqual([{ id: '1', text: 'комплитет туду', completed: true }]);
  });

  it('select uncompletedTodos', () => {
    const todoState = {
      todo: {
        todos: [
          { id: '1', text: 'комплитет туду', completed: true },
          { id: '2', text: 'актив туду', completed: false }
        ]
      }
    };
    expect(uncompletedTodos(todoState))
      .toEqual([{ id: '2', text: 'актив туду', completed: false }]);
  });

  it('select allTodos', () => {
    const todoState = {
      todo: {
        todos: [
          { id: '1', text: 'комплитет туду', completed: true },
          { id: '2', text: 'актив туду', completed: false }
        ]
      }
    };
    expect(allTodos(todoState)).toEqual([
      { id: '1', text: 'комплитет туду', completed: true },
      { id: '2', text: 'актив туду', completed: false }
    ]);
  });
});
