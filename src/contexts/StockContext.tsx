import { createContext, ReactNode, useContext } from "react";

import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useMutation, UseMutationResult } from "react-query";
import { toast } from "react-toastify";

interface Item {
  id?: string;
  name: string;
  description: string;
  type: string;
  amount: number;
  amount_min: number;
  local: string;
}

interface StockProviderContextData {
  createItem: UseMutationResult<Item, unknown, Item, unknown>;
  updateItem: UseMutationResult<Item, unknown, Item, unknown>;
  deleteItem: UseMutationResult<Item, unknown, string, unknown>;
}

const StockContext = createContext({} as StockProviderContextData);

interface StockProviderProps {
  children: ReactNode;
}

export function StockProvider({ children }: StockProviderProps) {
  const createItem = useMutation(
    async (data: Item) => {
      const res = await api.post<Item>("api/stock/create", {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Item Adicionado com sucesso");
        queryClient.invalidateQueries("stock");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos adicionar o item, tente mais tarde"
        );
      },
    }
  );

  const deleteItem = useMutation(
    async (id: string) => {
      const res = await api.delete<Item>(`api/stock/${id}/delete`);
      console.log(id);

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Item deletado com sucesso");
        queryClient.invalidateQueries("stock");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos deletar o item, tente mais tarde"
        );
      },
    }
  );

  const updateItem = useMutation(
    async (data: Item) => {
      const res = await api.put<Item>(`api/stock/${data.id}/update`, {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Item Adicionado com sucesso");
        queryClient.invalidateQueries("stock");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos adicionar o item, tente mais tarde"
        );
      },
    }
  );

  return (
    <StockContext.Provider value={{ createItem, updateItem, deleteItem }}>
      {children}
    </StockContext.Provider>
  );
}

export const useStock = () => useContext(StockContext);
