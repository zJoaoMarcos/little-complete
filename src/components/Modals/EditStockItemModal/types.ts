export interface StockItem {
  id: string;
  model: string;
  type: string;
  category: string;
  amount: number;
}

export interface TriggerEditItemProps {
  item: StockItem;
}

export interface EditItemModalProps {
  item: StockItem;
  isOpen: boolean;
  onClose: () => void;
}

export interface EditItemFormProps {
  item: StockItem;
  onClose: () => void;
}
