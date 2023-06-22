import { z } from "zod";
import { editStockItemSchema } from "./schema";

export type EditStockItemData = z.infer<typeof editStockItemSchema>;

export interface useEditStockItemProps {
  item: StockItem;
}

interface StockItem {
  id: string;
  brand: string;
  model: string;
  type: string;
  category: string;
  amount: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: string;
}
