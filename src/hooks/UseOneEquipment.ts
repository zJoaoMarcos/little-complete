import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

interface Equipment {
  equipment: {
    id: string;
    type: string | null;
    brand: string;
    model: string;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: Date | null;
    department: string;
    status: string;
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

export async function getOneEquipment(equipmentId: string): Promise<Equipment> {
  const { data } = await backend.get<Equipment>(`equipments/${equipmentId}`);

  const equipment = {
    id: data.equipment.id.trim(),
    type: formatData(data.equipment.type),
    brand: formatData(data.equipment.brand),
    model: formatData(data.equipment.model),
    supplier: formatData(data.equipment.supplier),
    invoice: formatData(data.equipment.invoice),
    warranty: data.equipment.warranty,
    purchase_date: data.equipment.purchase_date,
    department: formatData(data.equipment.department),
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

export function useOneEquipment(equipmentId: string, options: UseQueryOptions) {
  return useQuery(["user"], () => getOneEquipment(equipmentId), {
    staleTime: 1000 * 5, // 5 minutes
    ...options,
  }) as UseQueryResult<Equipment, unknown>;
}
