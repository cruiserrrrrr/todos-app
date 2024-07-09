import { FC } from "react";
import { IButton } from "../../services/types/global";
import styles from "./button.module.scss";

const Button: FC<IButton> = (props) => {

  const { className, onClick, text } = props;

  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
};

export default Button;