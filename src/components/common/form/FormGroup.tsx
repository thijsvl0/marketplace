import type { InputHTMLAttributes, ReactNode } from "react";

import { FieldError } from "react-hook-form";
import Input from "./Input";
import React from "react";
import clsx from "clsx";

interface FormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  name: string;
  label: string;
  errors?: FieldError;
}

const FormGroup = React.forwardRef<HTMLInputElement, FormGroupProps>(
  ({ icon, name, label, errors, ...props }, ref) => {
    return (
      <div className={clsx(errors ? "text-red-400" : "text-gray-400")}>
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          ref={ref}
          name={name}
          id={name}
          icon={icon}
          className={clsx(
            errors
              ? "!border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "text-black"
          )}
          {...props}
        />
        {errors && <div className="mt-1 text-red-500">{errors.message}</div>}
      </div>
    );
  }
);
export default FormGroup;
