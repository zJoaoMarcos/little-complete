import { z } from "zod";

export const OutputTransactionItemSchema = z.object({
  id: z.string(),
  amount: z.coerce.number(),
  requester: z.string(),
});
