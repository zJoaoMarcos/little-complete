import { createContext, useContext, useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import { useInvetoryList } from "@/hooks/useInventoryList";
import { EquipmentProviderContextData, EquipmentProviderProps } from "./types";

const EquipmentContext = createContext({} as EquipmentProviderContextData);

export function EquipmentProvider({ children }: EquipmentProviderProps) {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const debouncedWords = useDebounce(search, 500);

  const take = 26;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useInvetoryList({
    page,
    skip,
    take,
    id: debouncedWords,
    status: filter,
    type: type,
  });

  return (
    <EquipmentContext.Provider
      value={{
        data,
        isLoading,
        isFetching,
        setPage,
        page,
        setFilter,
        setType,
        setSearch,
        take,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
}

export const useEquipment = () => useContext(EquipmentContext);
