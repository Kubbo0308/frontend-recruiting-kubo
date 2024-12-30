import { Label } from "@headlessui/react";

interface FormLabelProps {
  label: string;
}

export const FormLabel = (props: FormLabelProps) => {
  const { label } = props;
  return (
    <Label className="text-[12px] font-bold leading-[1.21]">{label}</Label>
  );
};
