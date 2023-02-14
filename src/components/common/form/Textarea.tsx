import React from "react";
import type { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={twMerge(
          "w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </textarea>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
