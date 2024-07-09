import { FC } from "react";
import { IIcon } from "../../services/types/global";

export const XmarkIcon: FC<IIcon> = (props) => {
  const { className, fill } = props;
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 1.5L1.5 15.5"
        stroke={fill ? fill : "#000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 1.5L15.5 15.5"
        stroke={fill ? fill : "#000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
};