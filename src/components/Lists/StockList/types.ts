export interface StockListProps {
  stockList: GroupItems[];
}

export interface GroupItems {
  id: string;
  itemType: string;
  amount: number;
  amountMin: number;
}

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
