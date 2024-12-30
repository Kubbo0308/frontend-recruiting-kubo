import {
  Field,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { PREFECTURES } from "../../const";
import { FormLabel } from "../atoms/FormLabel";
import { useController } from "react-hook-form";
import { FaSortDown } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

interface FormSelectProps {
  label: string;
  placeholder: string;
  name: string;
}

export const FormSelect = (props: FormSelectProps) => {
  const { label, placeholder, name } = props;
  const {
    field: { value, onChange, ref },
  } = useController({
    name,
    rules: { required: true },
  });
  return (
    <Field className="flex gap-[10px] items-center">
      <div className="w-1/4 text-right">
        <FormLabel label={label} />
      </div>
      <div className="w-3/4">
        <Listbox value={value} onChange={onChange}>
          <ListboxButton
            ref={ref}
            className="relative w-[230px] h-[30px] pl-[8px] align-center border rounded-[5px] border-border"
          >
            <p
              className={`text-[12px] font-normal leading-[1.21] ${
                value ? "text-black" : "text-placeholder"
              } text-left`}
            >
              {value || placeholder}
            </p>
            <FaSortDown className="absolute top-0 right-[13px] group pointer-events-none size-[19.2px] text-icon" />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={
              "w-[var(--button-width)] rounded-xl border border-border bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            }
          >
            {PREFECTURES.map((prefecture) => (
              <ListboxOption
                key={prefecture.id}
                value={prefecture.name}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10 text-[12px] font-normal leading-[1.21]"
              >
                <IoMdCheckmark className="invisible size-3 group-data-[selected]:visible text-black" />
                <div>{prefecture.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </Field>
  );
};
