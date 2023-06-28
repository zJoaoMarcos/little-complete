import { z } from "zod";
import {
  EntryTransactionItemSchema,
  OutputTransactionItemSchema,
} from "./schema";

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

export interface EntryTransactionFormProps {
  item: StockItem;
}

export interface UseEntryTransactionItemProps {
  item: StockItem;
}

export type EntryTransactionItemData = z.infer<
  typeof EntryTransactionItemSchema
>;

export type OutputTransactionItemData = z.infer<
  typeof OutputTransactionItemSchema
>;

export interface OutputTransactionFormProps {
  item: StockItem;
}
