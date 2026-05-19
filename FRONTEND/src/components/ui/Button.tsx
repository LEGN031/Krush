import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-cyan-400 hover:bg-cyan-300 text-black shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 rounded-xl",
      outline:
        "border border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-500/30 rounded-xl",
      ghost: "hover:bg-cyan-400/10 text-cyan-400 rounded-xl",
      link: "text-cyan-400 underline-offset-4 hover:underline rounded-xl",
    };

    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-9 px-3",
      lg: "h-14 px-8 text-lg",
      icon: "h-12 w-12",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
