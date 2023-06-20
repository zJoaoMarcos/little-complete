export type Stock = {
  id: string;
  itemType: string;
  amount: number;
  amountMin: number;
};

export type GetStockListResponse = {
  stockList: Stock[];
  totalCount: number;
};
