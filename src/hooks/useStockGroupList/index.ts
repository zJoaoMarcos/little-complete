import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

import { api } from "@/services/api";
import { GetStockListResponse } from "./type";

export async function fetchStockList(): Promise<GetStockListResponse> {
  const { data } = await api.get<GetStockListResponse>("stock");

  const totalCount = data.totalCount;

  const stockList = data.stockList.map((item) => {
    return {
      id: item.id,
      itemType: item.itemType,
      amount: item.amount,
      amountMin: item.amountMin,
    };
  });

  return {
    stockList,
    totalCount,
  };
}

export function useStockGroupList(
  page: number,
  options?: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery(["stock-list", String(page)], () => fetchStockList(), {
    ...options,
    staleTime: 60,
  }) as UseQueryResult<GetStockListResponse, unknown>;
}
