import { Dispatch, ReactNode, SetStateAction } from "react";
import { UseMutationResult } from "react-query";

interface EquipmentProps {
  id: string;
  status: string;
  currentUser: string | null;
  patrimony: string | null;
  type: string | null;
  brand: string | null;
  model: string | null;
  serviceTag: string | null;
  purchase: {
    invoice: string | null;
    supplier: string | null;
    purchaseDate: Date | null;
    warranty: string | null;
  };
  department: {
    id: number | null;
    name: string | null;
  };
  config: {
    cpu: string | null;
    ram: string | null;
    video: string | null;
    storage: {
      slots: number | null;
      storage0Type: string | null;
      storage0Syze: number | null;
      storage1Type: string | null;
      storage1Syze: number | null;
    };
  };
}

export interface EquipmentsProps {
  equipments: EquipmentProps[];
  totalCount: number;
}

export interface CreateEquipmentData {
  id: string;
  brand: string;
  model: string;
  type: string;
  patrimony: string;
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

export interface UpdateEquipmentData {
  id: string;
  brand: string | null;
  model: string | null;
  type: string;
  patrimony: string;
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

export interface AssignEquipmentData {
  user_id: string;
  equipment_id: string;
}

export interface UpdateEquipmentStatusData {
  equipment_id: string;
  status: string;
}

export interface UnassignEquipmentData {
  username?: string;
  equipment_id: string;
}

export interface UnassignAllEquipmentsData {
  username: string;
}

export interface EquipmentProviderProps {
  children: ReactNode;
}

export interface EquipmentProviderContextData {
  data: EquipmentsProps | undefined;
  isFetching: boolean;
  isLoading: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
  take: number;
  page: number;
  setFilter: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
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
  unassignAllEquipments: UseMutationResult<
    UnassignAllEquipmentsData,
    unknown,
    UnassignAllEquipmentsData,
    unknown
  >;
  updateEquipmentStatus: UseMutationResult<
    UpdateEquipmentStatusData,
    unknown,
    UpdateEquipmentStatusData,
    unknown
  >;
}
