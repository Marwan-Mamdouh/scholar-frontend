"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type CustomLinkVariant = "primary" | "secondary" | "accent" | "danger";
interface CustomLinkProps extends LinkProps {
    children: ReactNode;
    className?: string;
    activeClassName?: string;
    isExternal?: boolean;
    variant?: CustomLinkVariant;
    outlined?: boolean;
}

export default function CustomLink({
    href,
    children,
    className = "",
    activeClassName = "",
    isExternal,
    variant,
    outlined = false,
    ...props
}: CustomLinkProps) {

    const variantStyles: Record<
        CustomLinkVariant,
        { solid: string; outlined: string }
    > = {
        primary: {
            solid: "text-primary-500 hover:text-primary-300",
            outlined:
                "border-2 border-primary-500 text-primary-500 hover:text-primary-300 hover:border-primary-300 hover:shadow-primary-200 hover:shadow-sm",
        },
        secondary: {
            solid: "text-neutral-200 hover:text-neutral-100",
            outlined:
                "border-2 border-neutral-200 text-neutral-200 hover:text-neutral-100 hover:border-neutral-100 hover:shadow-neutral-100 hover:shadow-sm",
        },
        accent: {
            solid: "text-accent-300 hover:text-accent-200",
            outlined: "border-2 border-accent-300 text-accent-300 hover:text-accent-200 hover:border-accent-200 hover:shadow-accent-200 hover:shadow-sm",
        },
        danger: {
            solid: "text-danger-200 hover:text-danger-400",
            outlined: "border-2 border-danger-200 text-danger-200 hover:text-danger-400 hover:border-danger-400 hover:shadow-danger-600 hover:shadow-sm",
        },
    };

    const baseStyles =
        "font-ui text-btn px-4 py-2 rounded-xl flex items-center justify-center transition-colors ease-in-out duration-300 shrink-0 gap-2";
    
    const pathname = usePathname();

    const isActive = pathname === href;

    let variantClass = "";
    if (variant) {
        const styleType = outlined ? "outlined" : "solid";
        variantClass = variantStyles[variant][styleType];
    }

    const activeClass = isActive ? activeClassName : "";
    const combinedClasses =
        `${baseStyles} ${variantClass} ${activeClass} ${className}`.trim();

    // Handle external links
    if (isExternal) {
        return (
            <a
                href={href.toString()}
                target="_blank"
                rel="noopener noreferrer"
                className={combinedClasses}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={combinedClasses} {...props}>
            {children}
        </Link>
    );
}
