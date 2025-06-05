import { z } from "zod";

const errorMessage = "Campo obrigatório!";
const isInvalid = "Email inválido!";
export const userRegisterSchema = z.object({
  name: z.string().trim().min(1, { message: errorMessage }),
  email: z.string().trim().email({ message: isInvalid }),
  password: z.string().trim().min(8, { message: errorMessage }),
});

export const userLoginSchema = z.object({
  email: z.string().trim().email({ message: isInvalid }),
  password: z.string().trim().min(8, { message: errorMessage }),
});

export const userClinicFormSchema = z.object({
  name: z.string().trim().min(1, { message: errorMessage }),
});
