"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-black sm:text-2xl font-semibold flex mb-2 sm:mb-[24px] items-center  font-['Montserrat']",
        className
      )}
      {...props} />
  );
}

export { Label }
