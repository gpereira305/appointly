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
import { userLoginSchema } from "@/utils/authSchemas";

type userLoginSchemaType = z.infer<typeof userLoginSchema>;
export default function LoginForm() {
  const router = useRouter();

  const form = useForm<userLoginSchemaType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<userLoginSchemaType> = async (values) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
          toast.success("Usuário logado com sucesso!");
        },
        onError: (error) => {
          toast.error("Email ou senha inválidos!");
          console.error("Erro ao logar usuário!", error);
        },
      },
    );
  };

  const formData: Array<{
    name: keyof userLoginSchemaType;
    label: string;
    type: string;
    placeholder: string;
  }> = [
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
              "Login"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
