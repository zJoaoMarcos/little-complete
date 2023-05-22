import { createContext, ReactNode, useContext } from "react";

import { backend } from "@/lib/backendApi";
import { queryClient } from "@/lib/queryClient";
import { AxiosError } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { toast } from "react-toastify";

interface CreateUserData {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: number;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
}

interface UpdateUserData {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: number;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date | null;
  demission_date: Date | null;
}

interface UpdateUserStatusData {
  user_name: string;
  status: string;
}

interface StockProviderContextData {
  createUser: UseMutationResult<
    CreateUserData,
    unknown,
    CreateUserData,
    unknown
  >;
  updateUser: UseMutationResult<
    UpdateUserData,
    unknown,
    UpdateUserData,
    unknown
  >;
  updateStatus: UseMutationResult<
    UpdateUserStatusData,
    unknown,
    UpdateUserStatusData,
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
      const res = await backend.post<CreateUserData>("users", {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Usuário criado com sucesso");
        queryClient.invalidateQueries("user");
      },
      onError: (error: AxiosError) => {
        toast.error(
          `Desculpe não conseguimos criar o usuário, tente mais tarde. ${error.response?.data}`
        );
      },
    }
  );

  const updateUser = useMutation(
    async (data: UpdateUserData) => {
      const res = await backend.patch<UpdateUserData>(
        `users/${data.user_name}`,
        {
          ...data,
        }
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Dados do Usuário alterado com sucesso");
        queryClient.invalidateQueries("user");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos alterar os dados do usuário, tente mais tarde. "
        );
      },
    }
  );

  const updateStatus = useMutation(
    async (data: UpdateUserStatusData) => {
      const res = await backend.patch<UpdateUserStatusData>(
        `users/status/${data.user_name}`,
        {
          status: data.status,
        }
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Status do Usuário alterado com sucesso");
        queryClient.invalidateQueries("user-");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos alterar o status do usuário, tente mais tarde. "
        );
      },
    }
  );

  return (
    <StockContext.Provider value={{ createUser, updateUser, updateStatus }}>
      {children}
    </StockContext.Provider>
  );
}

export const useUser = () => useContext(StockContext);
