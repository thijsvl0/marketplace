import type {
  ComponentType,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type { FieldError, Merge } from "react-hook-form";

import type { IconBaseProps } from "react-icons";
import ImageUpload from "./ImageUpload";
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

interface ImageAttributes extends InputHTMLAttributes<HTMLInputElement> {
  variant: "image";
  length: number;
}

interface InputAttributes extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "input";
}

type PolymorphicProps =
  | TextAreaAttributes
  | SelectAttributes
  | ImageAttributes
  | InputAttributes;

type PolymorphicElement = HTMLTextAreaElement &
  HTMLSelectElement &
  HTMLInputElement;

type FormGroupProps = PolymorphicProps & {
  Icon?: ComponentType<IconBaseProps>;
  label: string;
  errors?: Merge<FieldError, (FieldError | undefined)[]>;
};

const FormGroup = React.forwardRef<PolymorphicElement, FormGroupProps>(
  ({ Icon, name, label, errors, children, ...props }, ref) => {
    const getInput = () => {
      switch (props.variant) {
        case "textarea": {
          return (
            <TextArea
              ref={ref}
              id={name}
              name={name}
              className={clsx(
                errors
                  ? "!border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                  : "text-black"
              )}
              {...props}
            >
              {children}
            </TextArea>
          );
        }
        case "image": {
          return (
            <div className="flex flex-wrap justify-start gap-2">
              {Array.from({ length: props.length }).map((_x, i) => (
                <ImageUpload
                  key={i}
                  ref={ref}
                  id={`${name ?? ""}.${i + 1}`}
                  name={`${name ?? ""}.${i + 1}`}
                />
              ))}
            </div>
          );
        }
        case "select": {
          return (
            <Select
              ref={ref}
              id={name}
              name={name}
              className={clsx(
                errors
                  ? "!border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                  : "text-black"
              )}
              {...props}
            ></Select>
          );
        }
        default: {
          return (
            <Input
              ref={ref}
              id={name}
              name={name}
              Icon={Icon}
              className={clsx(
                errors
                  ? "!border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                  : "text-black"
              )}
              {...props}
            />
          );
        }
      }
    };

    return (
      <div className={clsx(errors ? "text-red-400" : "text-gray-400")}>
        <Label htmlFor={name}>{label}</Label>
        {getInput()}
        {errors && <div className="mt-1 text-red-500">{errors.message}</div>}
      </div>
    );
  }
);

FormGroup.displayName = "FormGroup";

export default FormGroup;
