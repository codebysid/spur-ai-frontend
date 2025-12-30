import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/helper";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    className?: string
}

const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<Variant, string> = {
    solid:
        "bg-primary text-white hover:bg-primary-hover active:bg-primary-active",
    outline:
        "border border-primary text-primary hover:bg-primary/10 active:bg-primary/20",
    ghost:
        "text-primary hover:bg-primary/10 active:bg-primary/20",
};

const sizeStyles: Record<Size, string> = {
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-4 text-sm",
    xl: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "solid",
            size = "lg",
            isLoading = false,
            className = "",
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `)}
                {...props}
            >
                {isLoading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
