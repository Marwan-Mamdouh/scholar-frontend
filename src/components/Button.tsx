import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "accent" | "danger";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

export default function Button({
  variant = "primary",
  children,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-primary-500 text-neutral-50 hover:bg-gradient-to-b hover:from-primary-300 hover:to-primary-700",
    secondary:
      "bg-neutral-100 text-neutral-900 hover:bg-gradient-to-b hover:from-neutral-100 hover:to-neutral-500",
    accent:
      "bg-accent-600 text-neutral-50 hover:bg-gradient-to-b hover:from-accent-300 hover:to-accent-700",
    danger:
      "bg-danger-500 text-neutral-50  hover:bg-danger-400",
  };

  const buttonClassName =
    `btn ${variantStyles[variant]} font-ui text-btn hover:from-20% hover:cursor-pointer py-2 px-4 rounded-xl flex items-center justify-center transition-colors ease-in-out duration-300 ${className} shrink-0 gap-2`.trim();

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
}
