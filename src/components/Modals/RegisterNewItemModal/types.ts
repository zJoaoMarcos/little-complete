export interface RegisterNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type StockGroup = {
  id: string;
  itemType: string;
  amount: number;
  amountMin: number;
};
