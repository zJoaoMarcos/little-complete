import { z } from "zod";
import { editStockItemSchema } from "./schema";

export type EditStockItemData = z.infer<typeof editStockItemSchema>;
