import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
import { useQuery } from "react-query";

interface Equipment {
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
}

interface Data {
  equipments: Equipment[];
  totalCount: number;
}

export async function getInventory(skip: number, take: number): Promise<Data> {
  const { data } = await backend.get<Data>(
    `equipments?skip=${skip}&take=${take}`
  );

  const equipments = data.equipments.map((equipment) => {
    return {
      id: equipment.id,
      type: formatData(equipment.type),
      brand: equipment.brand,
      model: equipment.model,
      supplier: equipment.supplier,
      invoice: equipment.invoice,
      warranty: equipment.warranty,
      purchase_date: equipment.purchase_date,
      department: equipment.department,
      status: equipment.status,
      cpu: equipment.cpu,
      ram: equipment.ram,
      slots: equipment.slots,
      storage0_type: equipment.storage0_type,
      storage0_syze: equipment.storage0_syze,
      storage1_type: equipment.storage1_type,
      storage1_syze: equipment.storage1_syze,
      video: equipment.video,
      service_tag: equipment.service_tag,
    };
  });

  const totalCount = data.totalCount;

  return { equipments, totalCount };
}

export function useInvetoryList(page: number, skip: number, take: number) {
  return useQuery(["equipments", page], () => getInventory(skip, take), {
    staleTime: 1000 * 5,
  });
}
