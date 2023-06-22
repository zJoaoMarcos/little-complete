import { z } from "zod";
import { OutputTransactionItemSchema } from "./schema";

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

export interface OutputTransactionFormProps {
  item: StockItem;
}

export type OutputTransactionItemData = z.infer<
  typeof OutputTransactionItemSchema
>;
