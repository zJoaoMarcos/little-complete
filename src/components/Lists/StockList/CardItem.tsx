import { TriggerEditStockItem } from "@/components/Modals/EditStockItemModal/Trigger";

interface CardItemProps {
  item: {
    id: string;
    type: string;
    model: string;
    category: string;
    amount: number;
    amountMin: number;
  };
}

export function CardItem({ item }: CardItemProps) {
  return (
    <div className="w-52 h-48 flex flex-col items-center justify-between rounded-md border p-4 bg-gray-50 shadow-md">
      <div className="w-full flex flex-row items-center justify-center border-gray-200 border-b">
        <p className="font-semibold text-purple-400 text-xs text-center">
          {item.type} - {item.model}
        </p>

        <TriggerEditStockItem item={item} />
      </div>

      <ul className="font-semibold ">
        <li>
          Quantidade: <span className="font-normal">{item.amount}</span>
        </li>
        <li>
          Quantidade min: <span className="font-normal">{item.amountMin}</span>
        </li>
      </ul>

      <button className="w-full rounded text-black font-semibold py-1  bg-purple-300 hover:bg-purple-400">
        Movimentar
      </button>
    </div>
  );
}
