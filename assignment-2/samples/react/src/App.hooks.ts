import { FieldErrors, useForm, UseFormRegister, UseFormReturn } from "react-hook-form";
import { FormSchema, FormType } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";

interface value {
  methods: UseFormReturn<FormType>;
  handleSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  isValid: boolean;
  isSubmitting: boolean;
}

export const useApp = (): value => {
  const methods = useForm<FormType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      zip: "",
      prefecture: "",
      address1: "",
      address2: "",
    },
  });

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = async (data: FormType) => {
    try {
      const res = await fetch("https://httpstat.us/201", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("サーバーエラー");
      }

      alert("フォーム送信が成功しました");
    } catch (error) {
      alert("送信に失敗しました");
    }
  };

  return { methods, handleSubmit: handleSubmit(onSubmit), register, errors, isValid, isSubmitting };
};
