import { FC, useEffect, useRef, useState } from "react";
import { IErrors, ITodo } from "../../services/types/global";
import styles from "./todo.module.scss";
import Checkbox from "../checkbox/checkbox";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../../services/redux/slices/todoSlice";
import { XmarkIcon } from "../icons/xmark-icon";
import { EditIcon } from "../icons/edit-icon";
import { CheckMarkIcon } from "../icons/check-mark";

const Todo: FC<ITodo> = (props) => {
  const { completed, text, id } = props;

  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [newTextValue, setNewTextValue] = useState<string>(text);
  const [isNewValue, setIsNewValue] = useState<boolean>(false);
  const [errors, setErrors] = useState<IErrors>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo({ id }));
    setIsCompleted(!isCompleted);
  }

  const handleDelete = () => {
    dispatch(deleteTodo({ id }));
  }

  const handleUpdate = () => {
    dispatch(updateTodo({ id, text: newTextValue }));
  }

  const handleStartEditSession = () => {
    const newErrors: IErrors = {}
    if (!isNewValue) {
      setIsNewValue(true);
      inputRef.current?.focus();
      return;
    }
    if (newTextValue.length >= 16) {
      setErrors({ newTodoValue: true });
      return;
    }
    if (isNewValue && newTextValue) {
      handleUpdate();
      setIsNewValue(false);
      setErrors({ newTodoValue: false });
      return;
    }
  }

  return (
    <div className={styles.todo}>
      {!!errors.newTodoValue && <p className={styles.error_text}>Неа, максимум 16 символов</p>}
      <Checkbox checked={isCompleted} for={`todo-${id}`} onChange={handleToggle} />
      {isNewValue ? (
        <input
          className={styles.input}
          value={newTextValue}
          onChange={(e) => setNewTextValue(e.target.value)}
          ref={inputRef}
        />
      ) : (
        <p className={styles.text}>{text}</p>
      )}
      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={handleDelete}
          data-testid="delete-button"
        >
          <XmarkIcon />
        </button>
        <button
          className={styles.button}
          onClick={handleStartEditSession}
          data-testid="edit-button"
        >
          {isNewValue ?
            <CheckMarkIcon className={styles.icon} />
            :
            <EditIcon className={styles.icon} />
          }
        </button>
      </div>
    </div>
  )
};

export default Todo;