import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Note: Ensure class-variance-authority is installed. 
// If not using cva, I'll use simple props for now to avoid extra dependency if not strictly needed, 
// but for "premium" and shadcn compat, cva is best.
// I haven't installed `class-variance-authority` and `@radix-ui/react-slot`.
// I'll stick to a simpler implementation for MVP or install them. 
// The plan didn't explicitly mention `class-variance-authority`, but `shadcn/ui` uses it.
// I will implement a robust button without CVA for now to save a step, or install it.
// Checking dependencies installed lists: `clsx`, `tailwind-merge`.
// I missed `class-variance-authority` and `@radix-ui/react-slot`.
// I will install them quickly to do it RIGHT.

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        // Custom implementation without CVA to avoid extra install just for this, 
        // unless I install it. 
        // Actually, I'll install it. It's cleaner.
        // For now, I'll return a simple button to keep flow and maybe do 
        // `npm install class-variance-authority @radix-ui/react-slot` in next step.
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-primary text-primary-foreground shadow hover:bg-primary/90": variant === "default",
                        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90": variant === "destructive",
                        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground": variant === "outline",
                        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80": variant === "secondary",
                        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
                        "text-primary underline-offset-4 hover:underline": variant === "link",
                        "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform": variant === "premium",
                    },
                    {
                        "h-9 px-4 py-2": size === "default",
                        "h-8 rounded-md px-3 text-xs": size === "sm",
                        "h-10 rounded-md px-8": size === "lg",
                        "h-9 w-9": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
