import { createContext, ReactNode, useContext } from "react";

import { queryClient } from "@/lib/queryClient";
import axios from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { toast } from "react-toastify";

interface CreateUserData {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: string;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date?: Date;
}

interface StockProviderContextData {
  createUser: UseMutationResult<
    CreateUserData,
    unknown,
    CreateUserData,
    unknown
  >;
}

const StockContext = createContext({} as StockProviderContextData);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const createUser = useMutation(
    async (data: CreateUserData) => {
      const res = await axios.post<CreateUserData>(
        "http://localhost:3001/users",
        {
          ...data,
        }
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Usuário criado com sucesso");
        queryClient.invalidateQueries("user");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos criar o usuário, tente mais tarde"
        );
      },
    }
  );

  return (
    <StockContext.Provider value={{ createUser }}>
      {children}
    </StockContext.Provider>
  );
}

export const useUser = () => useContext(StockContext);
