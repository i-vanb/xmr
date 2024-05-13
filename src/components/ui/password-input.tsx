'use client';
import * as React from "react"

import { cn } from "@/lib/utils"
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {Input} from "@/components/ui/input";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
// translate-x-1/2 translate-y-1/2
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}

        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4">
          {showPassword
            ? <EyeOffIcon className="select-none w-full cursor-pointer" onClick={()=>setShowPassword(false)}/>
            : <EyeIcon className="select-none w-full cursor-pointer" onClick={()=>setShowPassword(true)}/>
          }
        </div>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
