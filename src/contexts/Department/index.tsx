import { createContext, useContext, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import useDebounce from "@/hooks/useDebounce";
import { useDepartmentsList } from "@/hooks/useDepartmentsList";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import {
  DepartmentProviderContextData,
  DepartmentsProviderProps,
  UpdateDepartmentData,
} from "./type";

const DepartmentContext = createContext({} as DepartmentProviderContextData);

export function DepartmentProvider({ children }: DepartmentsProviderProps) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);

  const debouncedWord = useDebounce(search, 500);

  const take = 20;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useDepartmentsList({
    page,
    skip,
    take,
    id: debouncedWord,
  });

  const updateDepartment = useMutation(
    async (data: UpdateDepartmentData) => {
      const res = await api.patch<UpdateDepartmentData>(
        `departments/${data.id}`,
        {
          ...data,
        }
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Departamento alterado com sucesso");
        queryClient.invalidateQueries("department");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos alterar o departamento, tente mais tarde"
        );
      },
    }
  );

  return (
    <DepartmentContext.Provider
      value={{
        data,
        isFetching,
        isLoading,
        page,
        setPage,
        setSearch,
        take,
        updateDepartment,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
}

export const useDepartment = () => useContext(DepartmentContext);
