import React from "react";
import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          className={clsx(
            "w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm shadow-sm",
            className
          )}
          {...props}
        >
          {children}
        </textarea>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
