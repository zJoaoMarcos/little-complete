import { api } from "@/lib/api";
import { useQuery } from "react-query";

interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  value: string;
  amount: number;
  amount_min: number;
  local: string;
}

interface Data {
  items: Item[];
  totalCount: number;
}

export async function getShop(skip: number, take: number): Promise<Data> {
  const { data } = await api.get<Data>(`/api/shop?skip=${skip}&take=${take}`);

  const items = data.items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      type: item.type,
      value: item.value,
      amount: item.amount,
      amount_min: item.amount_min,
      local: item.local,
    };
  });

  const totalCount = data.totalCount;

  return { items, totalCount };
}

export function useShopList(page: number, skip: number, take: number) {
  return useQuery(["stock", page], () => getShop(skip, take), {
    staleTime: 1000 * 5,
  });
}
