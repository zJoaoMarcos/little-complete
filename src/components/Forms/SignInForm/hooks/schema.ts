import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .nonempty("Campo obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase()
    .trim()
    .refine(
      (email) => {
        return email.endsWith("@construtorapatriani.com.br");
      },
      { message: "O e-mail deve ser da PATRIANI" }
    ),
  password: z.string().trim().nonempty("Campo obrigatório"),
});
