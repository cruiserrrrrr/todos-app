import { FC } from "react";
import { IIcon } from "../../services/types/global";

export const DotsIcon: FC<IIcon> = (props) => {

  const { className, fill } = props;

  return (
    <svg
      className={className}
      width="16"
      height="4"
      // 0 0 16 4
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="2" fill={fill ? fill : "#7E7E7E"} />
      <circle cx="8" cy="2" r="2" fill={fill ? fill : "#7E7E7E"} />
      <circle cx="14" cy="2" r="2" fill={fill ? fill : "#7E7E7E"} />
    </svg>
  )
};