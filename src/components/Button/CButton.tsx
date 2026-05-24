import { ReactNode, ButtonHTMLAttributes } from "react";
import { ButtonIntent, ButtonVariant } from "./button.type";
import getButtonClasses, { getHoverOverlay } from "./button.style";

interface CButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  children?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}

const CButton = ({
  variant = "icon",
  intent = "danger",
  children = "icon",
  iconLeft,
  iconRight,
  textTransform = "capitalize",
  ...rest
}: CButtonProps) => {
  const overlay = getHoverOverlay(intent, variant);
  return (
    <button
      {...rest}
      className={`${getButtonClasses({ variant, intent })} ${textTransform}`}
    >
      <span className="relative  z-10">
        {iconLeft && <span>{iconLeft}</span>}
        {children && (
          <span
            className={`transition-all ease-in-out duration-500 p-0 ${variant === "link" && iconLeft ? "hover:pl-2" : ""} ${variant === "link" && iconRight ? "hover:pr-2" : ""}`}
          >
            {children}
          </span>
        )}
        {iconRight && <span>{iconRight}</span>}
      </span>

      <span
        className={`
      absolute inset-0
      opacity-0 group-hover:opacity-100
       transition-all ease-in-out duration-500
      pointer-events-none
      bg-linear-to-b ${overlay} 
    `}
      />
    </button>
  );
};

export default CButton;
