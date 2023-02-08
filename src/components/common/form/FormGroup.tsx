import type { ComponentType, InputHTMLAttributes } from "react";

import type { FieldError } from "react-hook-form";
import type { IconBaseProps } from "react-icons";
import Input from "./Input";
import Label from "./Label";
import React from "react";
import clsx from "clsx";

interface FormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: ComponentType<IconBaseProps>;
  name: string;
  label: string;
  errors?: FieldError;
}

const FormGroup = React.forwardRef<HTMLInputElement, FormGroupProps>(
  ({ Icon, name, label, errors, ...props }, ref) => {
    return (
      <div className={clsx(errors ? "text-red-400" : "text-gray-400")}>
        <Label htmlFor={name}>{label}</Label>
        <Input
          ref={ref}
          name={name}
          id={name}
          Icon={Icon}
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

FormGroup.displayName = "FormGroup";

export default FormGroup;
