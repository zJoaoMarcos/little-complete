/* 
import { api } from "@/services/api";
import { useQuery } from "react-query";
import { StockItem } from "../../types";

export async function fetchStockItems(type: string) {
  const { data} = await api.get<StockItem[]>(`stock/items/?type=${type}`);

  const stockList = data.
}

export function useStockItems(page: number, type: string) {
  return useQuery(["stockItems"], () => fetchStockItems(type), {
    staleTime: 60 * 60,
  });
}
 */