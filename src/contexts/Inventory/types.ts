import { Dispatch, ReactNode, SetStateAction } from "react";

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
}
