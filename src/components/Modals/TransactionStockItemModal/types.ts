export interface StockItem {
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

export interface TransactionStockItemModalProps {
  item: StockItem;
  isOpen: boolean;
  onClose: () => void;
}

export interface TriggerTransactionStockItemProps {
  item: StockItem;
}
