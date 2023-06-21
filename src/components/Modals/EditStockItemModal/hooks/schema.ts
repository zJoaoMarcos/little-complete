import { z } from "zod";

export const editStockItemSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  type: z.string(),
  category: z.string(),
});
