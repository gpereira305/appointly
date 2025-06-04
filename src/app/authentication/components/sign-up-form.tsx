"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { authClient } from "@/lib/auth-client";
import { userRegisterSchema } from "@/utils/authSchemas";

type UserRegisterSchemaType = z.infer<typeof userRegisterSchema>;
export default function SignupForm() {
  const router = useRouter();

  const form = useForm<UserRegisterSchemaType>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserRegisterSchemaType> = async (values) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
          toast.success("Usuário cadastrado com sucesso!");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_ALREADY_EXISTS") {
            toast.error("Usuário já cadastrado!");
            return;
          }
        },
      },
    );
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
          <Button
            type="submit"
            className={`w-full ${
              form.formState.isSubmitting
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
