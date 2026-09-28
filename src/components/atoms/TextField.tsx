import { forwardRef } from "react";
import type { TextFieldProps } from "./TextField.types";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ className, ...props }, ref) => {
  const classes = ["text-field", className].filter(Boolean).join(" ");
  return <input ref={ref} className={classes} {...props} />;
});

TextField.displayName = "TextField";
