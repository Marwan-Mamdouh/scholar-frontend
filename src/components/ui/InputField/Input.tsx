"use client";
import * as React from "react";
import { InputProps } from "./input.type";
import { Eye, EyeOff } from "lucide-react";
import { iconVariants, inputVariants, labelVariants } from "./input.style";

export const Input = React.forwardRef<React.ElementRef<"input">, InputProps>(
  (
    {
      label,
      error,
      success,
      endAdornment,
      className,
      disabled,
      type,
      size = "md",
      width = "full",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";

    const hasRightIcon = Boolean(endAdornment || isPassword);

    const hasLabel = Boolean(label);

    const variant = disabled
      ? "disabled"
      : error
        ? "error"
        : success
          ? "success"
          : "default";

    return (
      <div className="w-full font-main">
        <div className="relative">
          <input
            ref={ref}
            disabled={disabled}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            aria-invalid={!!error}
            aria-disabled={disabled}
            className={inputVariants({
              variant,
              hasRightIcon,
              hasLabel,
              size,
              width,
              className,
            })}
            {...props}
          />

          {label && (
            <span className={labelVariants({ variant: variant })}>{label}</span>
          )}

          {hasRightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {isPassword ? (
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setShowPassword((v) => !v)}
                  className={iconVariants({ variant: variant })}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              ) : (
                <div className={iconVariants({ variant: variant })}>
                  {endAdornment}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";