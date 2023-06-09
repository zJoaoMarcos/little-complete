import { z } from "zod";

export const EntryTransactionItemSchema = z.object({
  id: z.string(),
  price: z.string(),
  amount: z.coerce.number(),
  supplier: z.string(),
  invoice: z.string(),
});

export const OutputTransactionItemSchema = z.object({
  id: z.string(),
  amount: z.coerce.number(),
  requester: z.string(),
});
