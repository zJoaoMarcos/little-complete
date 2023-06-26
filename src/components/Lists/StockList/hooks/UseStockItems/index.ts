import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

import { api } from "@/services/api";
import { GetStockItemsResponse } from "./types";

export async function fetchStockItems(): Promise<GetStockItemsResponse> {
  const { data } = await api.get<GetStockItemsResponse>(`stock/items/`);

  const items = data.items.map((item) => {
    return {
      id: item.id,
      brand: item.brand,
      model: item.model,
      type: item.type,
      category: item.category,
      amount: item.amount,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
      createdBy: item.createdBy,
    };
  });

  return { items };
}

export function UseStockItems(
  options?: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery(["stock-items"], fetchStockItems, {
    ...options,
    staleTime: 60,
  }) as UseQueryResult<GetStockItemsResponse, unknown>;
}
