import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

interface Equipment {
  equipment: {
    id: string;
    type: string;
    brand: string;
    model: string;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: Date | null;
    department: {
      id: number | null;
      name: string | null;
    };
    status: string | null;
    cpu: string | null;
    ram: string | null;
    slots: number | null;
    storage0_type: string | null;
    storage0_syze: number | null;
    storage1_type: string | null;
    storage1_syze: number | null;
    video: string | null;
    service_tag: string | null;
  };
}

export async function getEquipment(equipmentId: string): Promise<Equipment> {
  const { data } = await backend.get<Equipment>(`equipments/${equipmentId}`);

  const equipment = {
    id: data.equipment.id.trim(),
    type: formatData(data.equipment.type),
    brand: data.equipment.brand,
    model: data.equipment.model,
    supplier: data.equipment.supplier,
    invoice: data.equipment.invoice,
    warranty: data.equipment.warranty,
    purchase_date: data.equipment.purchase_date,
    department: {
      id: data.equipment.department.id,
      name: data.equipment.department.name
        ? formatData(data.equipment.department.name)
        : null,
    },
    status: data.equipment.status,
    cpu: data.equipment.cpu,
    ram: data.equipment.ram,
    slots: data.equipment.slots,
    storage0_type: data.equipment.storage0_type,
    storage0_syze: data.equipment.storage0_syze,
    storage1_type: data.equipment.storage1_type,
    storage1_syze: data.equipment.storage1_syze,
    video: data.equipment.video,
    service_tag: data.equipment.service_tag,
  };

  return { equipment };
}

export function useFindEquipment(
  equipmentId: string,
  options?: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery(["equipment", equipmentId], () => getEquipment(equipmentId), {
    staleTime: 1000 * 60, // 60 minutes
    initialData: options?.initialData,
  }) as UseQueryResult<Equipment, unknown>;
}
