"use client";

import { Button } from "@headlessui/react";
import "./App.css";
import { FormInput } from "./components/molecules/FormInput";
import { FormSelect } from "./components/molecules/FormSelect";
import { FormProvider } from "react-hook-form";
import { useApp } from "./App.hooks";

function App() {
  const { methods, handleSubmit, register, errors, isValid, isSubmitting } =
    useApp();
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mx-auto max-w-[400px] mt-[14px]">
          <FormInput
            label="名前"
            placeholder="(例)トレタ 太郎"
            name="name"
            register={register}
            errorMessage={errors.name?.message}
          />
          <FormInput
            label="Eメール"
            placeholder="(例)yoyaku@toreta.in"
            name="email"
            register={register}
            errorMessage={errors.email?.message}
          />
          <FormInput
            label="郵便番号"
            placeholder="(例)0000000"
            name="zip"
            width="101px"
            register={register}
            errorMessage={errors.zip?.message}
          />
          <FormSelect
            label="都道府県"
            placeholder="選択してください"
            name="prefecture"
          />
          <FormInput
            label="市区町村"
            placeholder="(例)品川区西五反田７丁目２２−１７"
            name="address1"
            register={register}
            errorMessage={errors.address1?.message}
          />
          <FormInput
            label="建物名・号室"
            placeholder="(例)TOCビル 8F"
            name="address2"
            register={register}
            errorMessage={errors.address2?.message}
            required={false}
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="bg-button data-[disabled]:opacity-50 text-white px-[38px] py-[12px] rounded-[10px] align-center text-[12px] font-normal leading-[1.21] h-10 mt-[31px]"
          >
            登録
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default App;
