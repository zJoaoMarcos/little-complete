import { z } from "zod";

export const RegisterNewItemSchema = z.object({
  type: z.string().nonempty("O campo é obrigatório"),
  model: z.string().nullable(),
  category: z.string().nonempty("O campo é obrigatório"),
  amountMin: z.coerce
    .number()
    .positive("A quantidade minima deve ser positiva!"),
});
