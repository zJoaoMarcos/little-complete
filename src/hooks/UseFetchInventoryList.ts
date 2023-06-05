import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
import { useQuery } from "react-query";

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

interface Data {
  equipments: EquipmentProps[];
  totalCount: number;
}

interface FetchParams {
  key?: string;
  page?: number;
  skip?: number;
  take?: number;
  id?: string;
  departmentId?: number;
  status?: string;
}

export async function getInventoryList({
  skip = 0,
  take = 0,
  id,
  status,
  departmentId,
}: FetchParams): Promise<Data> {
  id = id ? `&id=${id}` : "";
  status = status ? `&status=${status}` : "";
  const department_id = departmentId ? `&department_id=${departmentId}` : "";

  const { data } = await backend.get<Data>(
    `inventory/equipments?skip=${skip}&take=${take}${id}${department_id}${status}`
  );

  const equipments = data.equipments.map((equipment) => {
    return {
      id: equipment.id,
      status: equipment.status.trim(),
      currentUser: equipment.currentUser,
      patrimony: equipment.patrimony,
      type: formatData(equipment.type),
      brand: formatData(equipment.brand),
      model: equipment.model,
      serviceTag: equipment.serviceTag,
      department: {
        id: equipment.department.id,
        name: formatData(equipment.department.name),
      },
      purchase: {
        warranty: equipment.purchase.warranty,
        invoice: equipment.purchase.invoice,
        supplier: equipment.purchase.supplier,
        purchaseDate: equipment.purchase.purchaseDate,
      },
      config: {
        cpu: equipment.config.cpu,
        ram: formatData(equipment.config.ram),
        video: equipment.config.video,
        storage: {
          slots: equipment.config.storage.slots,
          storage0Type: equipment.config.storage.storage0Type,
          storage0Syze: equipment.config.storage.storage0Syze,
          storage1Type: equipment.config.storage.storage1Type,
          storage1Syze: equipment.config.storage.storage1Syze,
        },
      },
    };
  });

  const totalCount = data.totalCount;

  return { equipments, totalCount };
}

export function useFetchInvetoryList({
  key = "inventory",
  page = 0,
  skip = 0,
  take = 0,
  id = "",
  status = "",
  departmentId,
}: FetchParams) {
  return useQuery(
    [key, page + id + status + departmentId],
    () => getInventoryList({ skip, take, id, status, departmentId }),
    {
      staleTime: 1000 * 60, //60 minutes
    }
  );
}
