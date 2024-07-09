import { FC } from "react";
import { IIcon } from "../../services/types/global";

export const EditIcon: FC<IIcon> = (props) => {
  const { className, fill } = props;
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0227 4.72247L14.1127 4.77447C14.8909 5.22369 15.5397 5.59828 16.0148 5.96492C16.5163 6.35191 16.9143 6.79611 17.0811 7.41829C17.2478 8.04048 17.1252 8.62417 16.8844 9.21006C16.6562 9.76514 16.2816 10.414 15.8323 11.1921L11.9568 17.9048C11.6599 18.4201 11.4251 18.8275 11.0677 19.1346C10.7104 19.4416 10.2722 19.6124 9.71809 19.8283L9.56835 19.8868C8.54013 20.2885 7.69257 20.6197 6.99851 20.7819C6.27263 20.9514 5.57176 20.9726 4.91849 20.5954C4.26522 20.2182 3.93306 19.6007 3.71699 18.8873C3.51039 18.2051 3.37341 17.3056 3.20723 16.2142L3.18297 16.0553C3.09294 15.4674 3.02175 15.0026 3.10899 14.5396C3.11989 14.4817 3.13311 14.4247 3.14848 14.3683C3.25606 13.9731 3.46891 13.6052 3.72947 13.1547L7.60509 6.44206C8.0543 5.66394 8.42889 5.01509 8.79553 4.53997C9.18253 4.03849 9.62672 3.64046 10.2489 3.47375C10.8711 3.30704 11.4548 3.42964 12.0407 3.67044C12.5958 3.89858 13.2446 4.27321 14.0227 4.72247ZM8.50313 7.88661L14.1323 11.1366L10.7089 17.0662C10.3359 17.7122 10.2293 17.8773 10.0902 17.9968C9.95108 18.1164 9.77174 18.1969 9.07696 18.4684C7.98049 18.8967 7.23373 19.1865 6.65725 19.3212C6.10038 19.4513 5.84769 19.3998 5.66849 19.2963C5.48929 19.1929 5.31836 18.9998 5.1526 18.4525C4.981 17.8859 4.85857 17.0943 4.68132 15.9305C4.56901 15.1931 4.5491 14.9975 4.58305 14.8173C4.61701 14.6371 4.70673 14.4622 5.07969 13.8162L8.50313 7.88661ZM15.497 8.63984C15.3645 8.96228 15.1618 9.34141 14.8807 9.83667L9.2547 6.58848C9.54308 6.09745 9.77007 5.73237 9.98305 5.45638C10.2675 5.08776 10.4591 4.97034 10.6371 4.92264C10.8152 4.87494 11.0398 4.88083 11.4705 5.05783C11.9213 5.24311 12.4829 5.56551 13.3177 6.04751C14.1526 6.52952 14.7126 6.85468 15.0984 7.15244C15.467 7.4369 15.5845 7.62851 15.6322 7.80652C15.6799 7.98454 15.674 8.20919 15.497 8.63984Z"
        fill={fill ? fill : "#000"} />
      <path
        d="M12.6597 20.2508C12.6597 19.8365 12.9955 19.5008 13.4097 19.5008H19.4097C19.8239 19.5008 20.1597 19.8365 20.1597 20.2508C20.1597 20.665 19.8239 21.0008 19.4097 21.0008H13.4097C12.9955 21.0008 12.6597 20.665 12.6597 20.2508Z"
        fill={fill ? fill : "#000"} />
    </svg>
  );
}