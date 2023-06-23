import { createContext, useContext, useState } from "react";

import { useMutation } from "react-query";
import { toast } from "react-toastify";

import useDebounce from "@/hooks/useDebounce";
import { useUsersList } from "@/hooks/useUsersLists";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import {
  StockProviderContextData,
  UpdateUserData,
  UserProviderProps,
} from "./types";

const StockContext = createContext({} as StockProviderContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedWords = useDebounce(search, 500);

  const take = 20;
  const skip = (page - 1) * take;

  const { data, isLoading, isFetching } = useUsersList({
    page,
    skip,
    take,
    id: debouncedWords,
    status: filter,
  });

  const updateUser = useMutation(
    async (data: UpdateUserData) => {
      const res = await api.patch<UpdateUserData>(`users/${data.user_name}`, {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["user", variables.user_name],
          }),
        ]);
        toast.success("Dados do usuário alterado com sucesso!");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos alterar os dados do usuário, tente mais tarde. "
        );
      },
    }
  );

  return (
    <StockContext.Provider
      value={{
        data,
        isLoading,
        isFetching,
        updateUser,
        setFilter,
        take,
        page,
        setPage,
        setSearch,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export const useUser = () => useContext(StockContext);
