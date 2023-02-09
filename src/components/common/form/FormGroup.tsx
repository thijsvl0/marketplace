import type {
  ComponentType,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import type { FieldError } from "react-hook-form";
import type { IconBaseProps } from "react-icons";
import Input from "./Input";
import Label from "./Label";
import React from "react";
import Select from "./Select";
import TextArea from "./Textarea";
import clsx from "clsx";

interface TextAreaAttributes
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: "textarea";
}

interface SelectAttributes extends SelectHTMLAttributes<HTMLSelectElement> {
  variant: "select";
}

interface InputAttributes extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "input";
}

type PolymorphicProps = TextAreaAttributes | SelectAttributes | InputAttributes;

type FormGroupProps = PolymorphicProps & {
  Icon?: ComponentType<IconBaseProps>;
  name: string;
  label: string;
  errors?: FieldError;
};

const FormGroup = React.forwardRef<
  HTMLTextAreaElement & HTMLSelectElement & HTMLInputElement,
  FormGroupProps
>(({ Icon, name, label, errors, children, ...props }, ref) => {
  return (
    <div className={clsx(errors ? "text-red-400" : "text-gray-400")}>
      <Label htmlFor={name}>{label}</Label>
      {props.variant == "textarea" ? (
        <TextArea
          ref={ref}
          name={name}
          id={name}
          className={clsx(
            errors
              ? "!border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "text-black"
          )}
          {...props}
        >
          {children}
        </TextArea>
      ) : props.variant == "select" ? (
        <Select
          ref={ref}
          name={name}
          id={name}
          className={clsx(
            errors
              ? "!border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "text-black"
          )}
          {...props}
        ></Select>
      ) : (
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
      )}

      {errors && <div className="mt-1 text-red-500">{errors.message}</div>}
    </div>
  );
});

FormGroup.displayName = "FormGroup";

export default FormGroup;
