import { Field, Input } from "@headlessui/react";
import { FormLabel } from "../atoms/FormLabel";
import { UseFormRegister } from "react-hook-form";
import { FormType } from "../../FormSchema";

interface FormInputProps {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  width?: string;
  register: UseFormRegister<FormType>;
  errorMessage?: string;
  required?: boolean;
}

export const FormInput = (props: FormInputProps) => {
  const {
    label,
    placeholder,
    name,
    type = "text",
    width = "230px",
    register,
    errorMessage,
    required = true,
  } = props;
  const borderColor = errorMessage ? "border-error" : "border-border";
  return (
    <Field className="flex gap-[10px] items-start">
      <div className="w-1/4 text-right">
        <FormLabel label={label} />
      </div>
      <div className="w-3/4">
        <Input
          {...register(name as keyof FormType, { required: required })}
          name={name}
          placeholder={placeholder}
          className={`w-[${width}] h-[30px] pl-[8px] py-[8px] border ${borderColor} rounded-[5px] text-[12px] font-normal leading-[1.21] placeholder:text-placeholder`}
          type={type}
        />
        {errorMessage && (
          <p className="text-error text-[10px] font-normal leading-[1.21] mt-[2px]">
            {errorMessage}
          </p>
        )}
      </div>
    </Field>
  );
};
