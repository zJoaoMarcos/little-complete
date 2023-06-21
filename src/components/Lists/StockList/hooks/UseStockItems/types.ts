export type GetStockItemsResponse = {
  items: StockItem[];
};

export type StockItem = {
  id: string;
  brand: string;
  model: string;
  type: string;
  category: string;
  amount: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: string;
};
