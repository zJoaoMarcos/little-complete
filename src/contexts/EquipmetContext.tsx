import { backend } from "@/lib/backendApi";
import { queryClient } from "@/lib/queryClient";
import { createContext, ReactNode, useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";
import { toast } from "react-toastify";

interface CreateEquipmentData {
  id: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department_id: number;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;
}

interface UpdateEquipmentData {
  id: string;
  brand: string | null;
  model: string | null;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department_id: number | null;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;
}

interface AssignEquipmentData {
  username: string;
  equipment_id: string;
}

interface UnassignEquipmentData {
  equipment_id: string;
}

interface StockProviderContextData {
  createEquipment: UseMutationResult<
    CreateEquipmentData,
    unknown,
    CreateEquipmentData,
    unknown
  >;
  updateEquipment: UseMutationResult<
    UpdateEquipmentData,
    unknown,
    UpdateEquipmentData,
    unknown
  >;
  assignEquipment: UseMutationResult<
    AssignEquipmentData,
    unknown,
    AssignEquipmentData,
    unknown
  >;
  unassignEquipment: UseMutationResult<
    UnassignEquipmentData,
    unknown,
    UnassignEquipmentData,
    unknown
  >;
}

const EquipmentContext = createContext({} as StockProviderContextData);

interface EquipmentProviderProps {
  children: ReactNode;
}

export function EquipmentProvider({ children }: EquipmentProviderProps) {
  const createEquipment = useMutation(
    async (data: CreateEquipmentData) => {
      const res = await backend.post<CreateEquipmentData>("equipments", {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Equipamento registrado com sucesso");
        queryClient.invalidateQueries("equipments");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos registrar o equipamento, tente mais tarde"
        );
      },
    }
  );

  const updateEquipment = useMutation(
    async (data: UpdateEquipmentData) => {
      const res = await backend.patch<UpdateEquipmentData>(
        `equipments/${data.id}`,
        {
          ...data,
        }
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Equipamento salvo com sucesso");
        queryClient.invalidateQueries("equipments");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos desatrubuir o equipamento, tente mais tarde"
        );
      },
    }
  );

  const assignEquipment = useMutation(
    async (data: AssignEquipmentData) => {
      const res = await backend.post<AssignEquipmentData>(`user-assignments/`, {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Equipamento atribuido com sucesso");
        queryClient.invalidateQueries("equipments");
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
      const res = await backend.delete<UnassignEquipmentData>(
        `user-assignments/${data.equipment_id}`
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Equipamento atribuido com sucesso");
        queryClient.invalidateQueries(`user-`);
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
        createEquipment,
        updateEquipment,
        assignEquipment,
        unassignEquipment,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
}

export const useEquipment = () => useContext(EquipmentContext);
