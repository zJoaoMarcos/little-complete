import { backend } from "@/lib/backendApi";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

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

export async function getEquipment(
  equipmentId: string
): Promise<EquipmentProps> {
  const { data } = await backend.get<EquipmentProps>(
    `inventory/equipment/${equipmentId}`
  );

  const equipment = {
    id: data.id,
    status: data.status.trim() ?? null,
    currentUser: data.currentUser,
    patrimony: data.patrimony,
    type: data.type,
    brand: data.brand,
    model: data.model,
    serviceTag: data.serviceTag,
    purchase: {
      warranty: data.purchase.warranty,
      invoice: data.purchase.invoice,
      supplier: data.purchase.supplier,
      purchaseDate: data.purchase.purchaseDate,
    },
    department: {
      id: data.department.id,
      name: data.department.name,
    },
    config: {
      cpu: data.config.cpu,
      ram: data.config.ram,
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
  }) as UseQueryResult<EquipmentProps, unknown>;
}
