import { ReactNode } from "react";

export type CardVariant = "solid" | "outlined";
export type CardIntent = "primary" | "secondary" | "accent";

export interface CardProps {
  variant?: CardVariant;
  intent?: CardIntent;
  icon?: ReactNode;
  badge?: ReactNode;
  callToAction?: string;
  title?: string;
  description?: string;
  className?: string;
  align?: "start" | "center" | "end";
  clickable?: boolean;
}
