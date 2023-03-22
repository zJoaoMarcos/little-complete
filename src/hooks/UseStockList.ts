import { api } from "@/lib/api";
import { useQuery } from "react-query";

interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  amount: number;
  amount_min: number;
  local: string;
}

interface Data {
  items: Item[];
}

export async function getStock(): Promise<Data> {
  const { data } = await api.get<Data>("/api/stock");

  const items = data.items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      type: item.type,
      amount: item.amount,
      amount_min: item.amount_min,
      local: item.local,
    };
  });

  return { items };
}

export function useStockList() {
  return useQuery("stock", getStock, {
    staleTime: 1000 * 5,
  });
}
