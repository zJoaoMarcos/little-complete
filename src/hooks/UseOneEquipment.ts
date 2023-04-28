import { backend } from "@/lib/backendApi";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

interface Equipment {
  id: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: string | null;
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
}

interface Data {
  equipment: Equipment;
}

export async function getOneEquipment(equipmentId: string): Promise<Data> {
  const { data } = await backend.get<Data>(`equipments/${equipmentId}`);

  const equipment = data.equipment;

  return { equipment };
}

export function useEquipment(equipmentId: string, options: UseQueryOptions) {
  return useQuery(["user"], () => getOneEquipment(equipmentId), {
    staleTime: 1000 * 5, // 5 minutes
    ...options,
  }) as UseQueryResult<Data, unknown>;
}
