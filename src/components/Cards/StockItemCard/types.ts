export interface StockItemCardProps {
  item: {
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
}

export interface CategoryIconProps {
  category: string;
}
