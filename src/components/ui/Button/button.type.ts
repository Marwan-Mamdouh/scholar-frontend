import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "solid" | "outlined" | "link" | "icon";
export type ButtonIntent = "primary" | "secondary" | "accent" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  size?: ButtonSize;
  children?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}
