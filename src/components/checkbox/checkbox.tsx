import React, { FC } from "react";
import { ICheckbox } from "../../services/types/global";
import styles from "./checkbox.module.scss";

const Checkbox: FC<ICheckbox> = (props) => {
  const { checked, onChange } = props;
  return (
    <label className={styles.checkboxContainer} htmlFor={props.for}>
      <input
        id={props.for}
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
        type="checkbox"
      />
      <span className={styles.customCheckbox}></span>
    </label>
  );
};

export default Checkbox;
