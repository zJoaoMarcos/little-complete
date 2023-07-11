import { api } from "@/services/api";
import { useQuery } from "react-query";

interface Item {
  id: string;
  type: string;
  model: string;
  category: string;
  amount: number;
  amountMin: number;
}

interface StockList {
  items: Item[];
}

type FetchParams = {
  key?: string;
};

async function getStockList() {
  const { data } = await api.get<StockList>("/stock/items/");

  const items = data.items.map((item) => {
    return {
      id: item.id,
      type: item.type,
      model: item.model,
      category: item.category,
      amount: item.amount,
      amountMin: item.amountMin,
    };
  });

  return { items };
}

export function useStockList({ key = "stock-list" }: FetchParams) {
  return useQuery([key], getStockList, {
    staleTime: 1000 * 60, // 60 min
  });
}
