import useDebounce from "@/hooks/UseDebounce";
import { useFetchInvetoryList } from "@/hooks/UseFetchInventoryList";
import { createContext, useContext, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import {
  AssignEquipmentData,
  EquipmentProviderContextData,
  EquipmentProviderProps,
  UnassignAllEquipmentsData,
  UnassignEquipmentData,
  UpdateEquipmentStatusData,
} from "./types";

const EquipmentContext = createContext({} as EquipmentProviderContextData);

export function EquipmentProvider({ children }: EquipmentProviderProps) {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const debouncedWords = useDebounce(search, 500);

  const take = 26;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useFetchInvetoryList({
    page,
    skip,
    take,
    id: debouncedWords,
    status: filter,
    type: type,
  });

  const assignEquipment = useMutation(
    async (data: AssignEquipmentData) => {
      const res = await api.post<AssignEquipmentData>(`user-assignments/`, {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        toast.success("Equipamento atribuido com sucesso");
        queryClient.invalidateQueries(["user", variables.user_id]);
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos atribuir o equipamento, tente mais tarde"
        );
      },
    }
  );

  const unassignEquipment = useMutation(
    async (data: UnassignEquipmentData) => {
      const res = await api.delete<UnassignEquipmentData>(
        `user-assignments/${data.equipment_id}`
      );

      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        Promise.all([
          queryClient.invalidateQueries(["equipment", variables.equipment_id]),
          queryClient.invalidateQueries(["user", variables.username]),
        ]);
        toast.success("Equipamento atribuido com sucesso");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos atribuir o equipamento, tente mais tarde"
        );
      },
    }
  );

  const unassignAllEquipments = useMutation(
    async (data: UnassignAllEquipmentsData) => {
      const res = await api.delete<UnassignAllEquipmentsData>(
        `user-assignments/all/${data.username}`
      );

      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        toast.success("Equipamento atribuido com sucesso");
        queryClient.invalidateQueries({
          queryKey: ["user", variables.username],
        });
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos atribuir o equipamento, tente mais tarde"
        );
      },
    }
  );

  const updateEquipmentStatus = useMutation(
    async (data: UpdateEquipmentStatusData) => {
      const res = await api.patch<UpdateEquipmentStatusData>(
        `inventory/equipment/status/${data.equipment_id}`,
        {
          ...data,
        }
      );

      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        toast.success("Equipamento atribuido com sucesso");
        queryClient.invalidateQueries({
          queryKey: ["equipment", variables.equipment_id],
        });
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos atribuir o equipamento, tente mais tarde"
        );
      },
    }
  );

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
        assignEquipment,
        unassignEquipment,
        unassignAllEquipments,
        updateEquipmentStatus,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
}

export const useEquipment = () => useContext(EquipmentContext);
