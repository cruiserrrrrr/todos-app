import { Dispatch, SetStateAction } from "react";

export interface IBase {
  id: string;
}

export interface IIcon {
  className?: string;
  fill?: string;
}

export interface IButton {
  text: string;
  onClick: () => void;
  className?: string;
}
export interface ICheckbox {
  for: string;
  checked: boolean;
  onChange?: () => void;
}

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface IErrors {
  [key: string]: string | boolean
}

export interface INewTodo {
  isAdded: boolean;
  handleAddTodo: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  error: boolean | string
}