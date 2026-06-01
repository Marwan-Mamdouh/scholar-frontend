import { ReactNode } from "react";

export type BadgeVariant = "solid" | "outlined";
export type BadgeIntent = "primary" | "secondary" | "accent";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant: BadgeVariant;
  intent: BadgeIntent;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}
