import { z } from "zod";

export const RegisterNewItemSchema = z.object({
  brand: z.string(),
  model: z.string(),
  type: z.string(),
  category: z.string(),
});
