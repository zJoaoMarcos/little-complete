import { api } from "@/lib/api";
import { createContext, ReactNode, useContext } from "react";
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
}

const StockContext = createContext({} as StockProviderContextData);

interface StockProviderProps {
  children: ReactNode;
}

export function StockProvider({ children }: StockProviderProps) {
  async function createItem(data: Item) {
    await api
      .post("api/stock/create", {
        ...data,
      })
      .then(() => toast.success("Item Adicionado com sucesso"))
      .catch(() =>
        toast.error(
          "Desculpe não conseguimos adicionar o seu item, tente mais tarde"
        )
      );
  }

  return (
    <StockContext.Provider value={{ createItem }}>
      {children}
    </StockContext.Provider>
  );
}

export const useStock = () => useContext(StockContext);
