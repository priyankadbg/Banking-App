import React from "react";
import { FormField, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

interface CustomInputProps {
  form: Control<z.infer<typeof authFormSchema>>;
  name: string;
  label: string;
  placeholder: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  form,
  name,
  label,
  placeholder,
}) => {
  return (
    <FormField
      control={form}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
