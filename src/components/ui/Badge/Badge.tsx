import { BadgeProps } from "./badge.type";
import getBadgeStyle from "./badge.style";

const Badge = ({
  intent = "primary",
  variant = "solid",
  size,
  leftIcon,
  rightIcon,
  children,
  className = "",
  textTransform = "capitalize",
}: BadgeProps) => {
  return (
    <div
      className={`${getBadgeStyle(intent, variant, size)} ${className} ${textTransform} `}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </div>
  );
};

export default Badge;
