"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userClinicFormSchema } from "@/utils/authSchemas";

type userClinicFormSchemaType = z.infer<typeof userClinicFormSchema>;
export default function Form() {
  const form = useForm<userClinicFormSchemaType>({
    resolver: zodResolver(userClinicFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<userClinicFormSchemaType> = async (values) => {
    try {
      await createClinic(values.name);
      toast.success("Clínica criada com sucesso!");
      form.reset();
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.log(error);
      toast.error("Erro ao criar clínica!");
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          id="clinic-form"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="gap-[2px]">
                <FormLabel className="text-base">Nome da clínica:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome da sua clínica"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm italic" />
              </FormItem>
            )}
          />
          <DialogFooter>
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
                <>
                  <Loader2 className="animate-spin" /> Criando...
                </>
              ) : (
                "Criar clínica"
              )}
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </>
  );
}
