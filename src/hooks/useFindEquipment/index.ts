import { api } from "@/services/api";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

import { formatData } from "@/utils/formatData";
import { Equipment } from "./types";

export async function getEquipment(equipmentId: string): Promise<Equipment> {
  const { data } = await api.get<Equipment>(`/equipments/${equipmentId}`);

  const equipment = {
    id: data.id,
    status: data.status.trim(),
    currentUser: data.currentUser,
    patrimony: data.patrimony,
    type: formatData(data.type)!,
    brand: formatData(data.brand),
    model: formatData(data.model),
    serviceTag: data.serviceTag,
    purchase: {
      warranty: data.purchase.warranty,
      invoice: data.purchase.invoice,
      supplier: data.purchase.supplier,
      purchaseDate: data.purchase.purchaseDate,
    },
    department: {
      id: data.department.id,
      name: formatData(data.department.name),
    },
    config: {
      cpu: data.config.cpu,
      ram: formatData(data.config.ram),
      video: data.config.video,
      storage: {
        slots: data.config.storage.slots,
        storage0Type: data.config.storage.storage0Type,
        storage0Syze: data.config.storage.storage0Syze,
        storage1Type: data.config.storage.storage1Type,
        storage1Syze: data.config.storage.storage1Syze,
      },
    },
  };

  return equipment;
}

interface Params {
  equipmentId: string;
  options?: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    "queryKey" | "queryFn"
  >;
}

export function useFindEquipment({ equipmentId, options }: Params) {
  return useQuery(["equipment", equipmentId], () => getEquipment(equipmentId), {
    staleTime: 1000 * 60, // 60 minutes
    ...options,
  }) as UseQueryResult<Equipment, unknown>;
}
