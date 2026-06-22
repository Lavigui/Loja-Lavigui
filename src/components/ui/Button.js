import { forwardRef } from "react";

const variants = {
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-900",
  outline:
    "bg-transparent text-neutral-900 border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50",
  ghost:
    "bg-transparent text-neutral-600 hover:text-neutral-900 border border-transparent",
  white:
    "bg-white text-neutral-900 hover:bg-neutral-100 border border-white",
  darkOutline:
    "bg-transparent text-white border border-white/30 hover:border-white/80 hover:bg-white hover:text-neutral-900",
};

const sizes = {
  sm: "px-6 py-2.5 text-[11px] tracking-[0.1em]",
  md: "px-8 py-3.5 text-[12px] tracking-[0.12em]",
  lg: "px-10 py-4 text-[13px] tracking-[0.15em]",
};

const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      children,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center font-medium uppercase transition-all duration-300 ${
          variants[variant]
        } ${sizes[size]} ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
