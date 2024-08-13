import { FC, useEffect, useState } from 'react';
import styles from "./todos-wrapper.module.scss";
import Todo from '../todo/todo';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, allTodos, completedTodos, uncompletedTodos } from '../../services/redux/slices/todoSlice';
import NewTodo from '../new-todo/new-todo';
import { IErrors, ITodo } from '../../services/types/global';


const TodosWrapper: FC = () => {
  const allTodosList = useSelector(allTodos);
  const completedTodosList = useSelector(completedTodos);
  const uncompletedTodosList = useSelector(uncompletedTodos);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [newTodoValue, setNewTodoValue] = useState<string>('');
  const [errors, setErrors] = useState<IErrors>({});
  const [todosList, setTodosList] = useState<ITodo[]>(allTodosList);
  const [choicesListName, setChoicesListName] = useState<string>('All');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const newErrors: IErrors = {}
    if (!isAdded) {
      setIsAdded(true);
    } else {
      if (!newTodoValue) {
        setIsAdded(false);
        return
      }
      // add
      if (allTodosList.length > 4) {
        newErrors.maxLengthList = true;
        setErrors({ ...errors, ...newErrors });
      }

      if (newTodoValue.length >= 16) {
        newErrors.newTodoValue = true;
        setErrors({ ...errors, ...newErrors });
      } else {
        setErrors({});
      }
      if (Object.keys(newErrors).length) return
      dispatch(addTodo({ text: newTodoValue }));
      setNewTodoValue('');
      setIsAdded(false);
    };
  };

  useEffect(() => {
    if(!completedTodosList.length) {
      setTodosList(allTodosList);
      return;
    }
    if(!uncompletedTodosList.length){
      setTodosList(allTodosList);
      return;
    }
    switch (choicesListName) {
      case 'All':
        setTodosList(allTodosList);
        break;
      case 'Completed':
        setTodosList(completedTodosList);
        break;
      case 'Active':
        setTodosList(uncompletedTodosList);
        break;
      default:
        break;
    }
  }, [allTodosList])

  const handleChoice = (list: ITodo[], name: string) => {
    setTodosList(list);
    setChoicesListName(name);
  };
  
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1>Todo</h1>
        <div className={styles.buttons}>
          <button
            className={`${styles.sort_button} ${styles.all}`}
            title='Все'
            onClick={() => handleChoice(allTodosList, 'All')}
          />
          <button
            className={`${styles.sort_button} ${styles.completed}`}
            title='Выполнено'
            onClick={() => handleChoice(completedTodosList, 'Completed')}
          />
          <button
            className={`${styles.sort_button} ${styles.active}`}
            title='Активно'
            onClick={() => handleChoice(uncompletedTodosList, 'Active')}
          />
        </div>
      </div>
      {todosList.length ? (
        <div className={styles.content}>
          {todosList.map((todo: ITodo, index: number) => (
            <Todo
              key={todo.id + index}
              text={todo.text}
              completed={todo.completed}
              id={todo.id}
            />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Нет тудушек</p>
      )}
      <NewTodo
        error={errors.newTodoValue}
        maxLengthList={errors.maxLengthList}
        handleAddTodo={handleAddTodo}
        isAdded={isAdded}
        inputValue={newTodoValue}
        setInputValue={setNewTodoValue}
      />
    </div>
  );
};

export default TodosWrapper;
