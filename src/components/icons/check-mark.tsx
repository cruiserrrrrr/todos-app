import { FC } from "react";
import { IIcon } from "../../services/types/global";

export const CheckMarkIcon: FC<IIcon> = (props) => {
  const { className, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      className={className}
    >
      <path
        d="M1.04999 3.6499L5.09999 7.6999L11.4 1.3999"
        stroke={fill ? fill : "#000"}
        strokeWidth="2"
      />
    </svg>
  );
}