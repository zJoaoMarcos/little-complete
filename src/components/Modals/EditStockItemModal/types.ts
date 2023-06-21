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

export interface TriggerEditStockItemProps {
  item: StockItem;
}

export interface EditStockItemModalProps {
  item: StockItem;
  isOpen: boolean;
  onClose: () => void;
}
