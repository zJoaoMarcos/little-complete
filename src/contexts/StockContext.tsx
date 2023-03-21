import { api } from "@/lib/api";
import { createContext, ReactNode, useContext, useState } from "react";
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
  createItem: (data: Item) => Promise<void>;

  isLoading: boolean;
}

const StockContext = createContext({} as StockProviderContextData);

interface StockProviderProps {
  children: ReactNode;
}

export function StockProvider({ children }: StockProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function createItem(data: Item) {
    setIsLoading(true);

    console.log(data);

    api
      .post("api/stock/create", {
        ...data,
      })
      .then(() => toast.success("Item Adicionado com sucesso"))
      .catch(() =>
        toast.error(
          "Desculpe não conseguimos adicionar o seu item, tente mais tarde"
        )
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <StockContext.Provider value={{ createItem, isLoading }}>
      {children}
    </StockContext.Provider>
  );
}

export const useStock = () => useContext(StockContext);
