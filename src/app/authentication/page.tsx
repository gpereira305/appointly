import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SignupForm from "./components/sign-up-form";

export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="cursor-pointer">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="cursor-pointer">
            Criar conta
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Já possui uma conta?</CardTitle>
              <CardDescription className="text-base">
                Faça login na sua conta para continuar.
              </CardDescription>
            </CardHeader>

            <LoginForm />
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Cadastre-se agora mesmo!
              </CardTitle>
              <CardDescription className="text-base">
                Crie sua conta para acessar a plataforma.
              </CardDescription>
            </CardHeader>

            <SignupForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
