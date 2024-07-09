import { FC } from "react";
import { INewTodo } from "../../services/types/global";
import styles from "./new-todo.module.scss";
import Button from "../button/button";


const NewTodo: FC<INewTodo> = (props) => {
  const {
    isAdded,
    handleAddTodo,
    inputValue,
    setInputValue,
    error
  } = props
  return (
    <div className={styles.wrap}>
      {!!error && <p className={styles.error_text}>хочешь больше? плати</p>}
      {!!error && <p className={styles.error_text}>Лимит 16 символов, сейчас {inputValue.length}</p>}
      <input
        type="text"
        placeholder="Что будем делать?"
        className={`${isAdded ? styles.input : styles.input_disable} ${error ? styles.error : ''}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button text={isAdded ? 'точно?' : 'Добавить'} onClick={handleAddTodo} />
    </div>
  )
};

export default NewTodo;