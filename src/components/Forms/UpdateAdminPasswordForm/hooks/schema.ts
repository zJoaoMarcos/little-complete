import { z } from "zod";

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().trim().nonempty("Este campo é obrigatório"),
    newPassword: z
      .string()
      .trim()
      .min(8, { message: "Deve ter 8 ou mais caracteres" })
      .max(14, { message: "Deve ter 14 ou menos caracteres" }),
    confirmPassword: z.string().trim().nonempty("Este campo é obrigatório"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
