import { createContext, ReactNode, useContext } from "react";

import { backend } from "@/lib/backendApi";
import { queryClient } from "@/lib/queryClient";
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

interface ChangeStatusData {
  user_name: string;
  status: string;
}

interface ChangeDepartmentData {
  user_name: string;
  department_id: string;
  title: string;
  direct_boss: string;
}

interface StockProviderContextData {
  createUser: UseMutationResult<
    CreateUserData,
    unknown,
    CreateUserData,
    unknown
  >;
  changeStatus: UseMutationResult<
    ChangeStatusData,
    unknown,
    ChangeStatusData,
    unknown
  >;
  changeDepartment: UseMutationResult<
    ChangeDepartmentData,
    unknown,
    ChangeDepartmentData,
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
      onError: () => {
        toast.error(
          "Desculpe não conseguimos criar o usuário, tente mais tarde"
        );
      },
    }
  );

  const changeStatus = useMutation(
    async (data: ChangeStatusData) => {
      const res = await backend.patch<ChangeStatusData>(
        `users/status/${data.user_name}`,
        {
          ...data,
        }
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Status alterado com sucesso");
        queryClient.invalidateQueries("user");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos alterar o status do usuário, tente mais tarde"
        );
      },
    }
  );

  const changeDepartment = useMutation(
    async (data: ChangeDepartmentData) => {
      const res = await backend.patch<ChangeDepartmentData>(
        `users/department/${data.user_name}`,
        {
          ...data,
        }
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Status alterado com sucesso");
        queryClient.invalidateQueries("user");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos alterar o status do usuário, tente mais tarde"
        );
      },
    }
  );

  return (
    <StockContext.Provider
      value={{ createUser, changeStatus, changeDepartment }}
    >
      {children}
    </StockContext.Provider>
  );
}

export const useUser = () => useContext(StockContext);
