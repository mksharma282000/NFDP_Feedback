import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "",
  {
    variants: {
      variant: {
        default:
          "h-14 px-7 py-3.5 bg-white rounded-lg border border-[#d5d5d5] justify-center items-center gap-3.5 inline-flex overflow-hidden",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "h-14 px-7 py-3.5 bg-white rounded-lg shadow-[0px_0px_0px_3px_rgba(208,235,255,1.00)] border-2 border-[#0080e1] justify-center items-center gap-3.5 inline-flex overflow-hidden",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-7 py-3.5 bg-white rounded-lg border border-[#d5d5d5] justify-center items-center gap-3.5 inline-flex overflow-hidden",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
