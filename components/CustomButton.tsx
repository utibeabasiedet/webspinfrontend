import Image from "next/image";
import { MouseEventHandler } from "react";
import { ThreeDots } from "react-loader-spinner";

interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string | any;
  rightIcon?: string | any;
  onClick?: () => void;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  isDisabled,
  btnType,
  containerStyles,
  textStyles,
  title,
  rightIcon,
  handleClick,
}: CustomButtonProps) => (
  <button
    disabled={isDisabled}
    type={btnType || "button"}
    className={`flex items-center px-4 py-3 justify-center bg-blue-800 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
      isDisabled ? `bg-blue-400 ` : `bg-blue-700 text-white`
    } ${containerStyles}`}
    onClick={handleClick}>
    {isDisabled ? (
      <ThreeDots
        height="24"
        width="40"
        radius="9"
        color="#FFFFFF"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    ) : (
      <span className={`${textStyles}`}>{title}</span>
    )}
    {rightIcon && (
      <div className="relative w-4 h-4 ml-2">
        <Image
          src={rightIcon}
          alt="arrow_left"
          fill
          className="object-contain"
        />
      </div>
    )}
  </button>
);

export default Button;
