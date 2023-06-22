import { z } from "zod";

export const EntryTransactionItemSchema = z.object({
  id: z.string(),
  price: z.string(),
  amount: z.coerce.number(),
  supplier: z.string(),
  nf: z.string(),
});
