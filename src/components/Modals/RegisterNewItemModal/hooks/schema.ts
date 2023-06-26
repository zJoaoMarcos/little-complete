import { z } from "zod";

export const RegisterNewItemSchema = z.object({
  brand: z.string(),
  model: z.string(),
  type: z.string(),
  isNewTypeGroup: z.boolean(),
  newTypeName: z.string(),
  newTypeAmountMin: z.coerce.number().nullable(),
  category: z.string(),
});
