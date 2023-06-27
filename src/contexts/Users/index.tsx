import { createContext, useContext, useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import { useUsersList } from "@/hooks/useUsersLists";
import { StockProviderContextData, UserProviderProps } from "./types";

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

  return (
    <StockContext.Provider
      value={{
        data,
        isLoading,
        isFetching,
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
