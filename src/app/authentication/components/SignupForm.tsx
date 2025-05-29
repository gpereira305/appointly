import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const errorMessage = "Campo obrigatório!";
const userRegisterSchema = z.object({
  name: z.string().trim().min(1, { message: errorMessage }),
  email: z.string().trim().email({ message: "Email inválido!" }),
  password: z.string().trim().min(6, { message: errorMessage }),
});

// Explicitly define the type for better type inference
type UserRegisterSchemaType = z.infer<typeof userRegisterSchema>;
export default function SignupForm() {
  const form = useForm<UserRegisterSchemaType>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  // Use SubmitHandler for more explicit typing
  const onSubmit: SubmitHandler<UserRegisterSchemaType> = (values) => {
    console.log(values);
  };

  const formData: Array<{
    name: keyof UserRegisterSchemaType;
    label: string;
    type: string;
    placeholder: string;
  }> = [
    {
      name: "name",
      label: "Seu nome:",
      type: "text",
      placeholder: "Digite seu nome",
    },
    {
      name: "email",
      label: "Seu email:",
      type: "email",
      placeholder: "Digite seu email",
    },
    {
      name: "password",
      label: "Sua senha:",
      type: "password",
      placeholder: "Digite sua senha",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardContent className="space-y-4">
          {formData.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem className="gap-[2px]" key={field.name}>
                  <FormLabel className="text-base">{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={field.placeholder}
                      type={field.type}
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage className="text-sm italic" />
                </FormItem>
              )}
            />
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full cursor-pointer">
            Cadastrar
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
