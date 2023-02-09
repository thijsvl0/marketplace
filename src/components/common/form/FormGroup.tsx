import type {
  ComponentType,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import type { FieldError } from "react-hook-form";
import type { IconBaseProps } from "react-icons";
import Input from "./Input";
import Label from "./Label";
import React from "react";
import TextArea from "./Textarea";
import clsx from "clsx";

interface TextAreaAttributes<T> extends TextareaHTMLAttributes<T> {
  variant?: "textarea";
}

interface InputAttributes<T> extends InputHTMLAttributes<T> {
  variant?: "input";
}

type InputProps =
  | TextAreaAttributes<HTMLTextAreaElement>
  | InputAttributes<HTMLInputElement>;

type FormGroupProps = InputProps & {
  Icon?: ComponentType<IconBaseProps>;
  name: string;
  label: string;
  errors?: FieldError;
};

const FormGroup = React.forwardRef<
  HTMLTextAreaElement & HTMLInputElement,
  FormGroupProps
>(
  (
    { Icon, name, label, errors, children, variant = "input", ...props },
    ref
  ) => {
    return (
      <div className={clsx(errors ? "text-red-400" : "text-gray-400")}>
        <Label htmlFor={name}>{label}</Label>
        {variant == "textarea" ? (
          <TextArea
            ref={ref}
            name={name}
            id={name}
            placeholder={props.placeholder}
            className={clsx(
              errors
                ? "!border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "text-black"
            )}
          >
            {children}
          </TextArea>
        ) : (
          <Input
            ref={ref}
            name={name}
            id={name}
            Icon={Icon}
            placeholder={props.placeholder}
            className={clsx(
              errors
                ? "!border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "text-black"
            )}
          />
        )}

        {errors && <div className="mt-1 text-red-500">{errors.message}</div>}
      </div>
    );
  }
);

FormGroup.displayName = "FormGroup";

export default FormGroup;
