import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
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

interface User {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department: { id: number; name: string };
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date | null;
    demission_date: Date | null;
    status: string;
  };
  equipments: EquipmentProps[];
}

export async function getUser(userId: string): Promise<User> {
  const { data } = await backend.get<User>(`users/${userId}`);

  const user = {
    user_name: data.user.user_name.trim(),
    complete_name: formatData(data.user.complete_name)!,
    title: formatData(data.user.title)!,
    department: {
      id: data.user.department.id,
      name: formatData(data.user.department.name)!,
    },
    telephone: data.user.telephone ? data.user.telephone : null,
    direct_boss: data.user.direct_boss,
    smtp: data.user.smtp.trim(),
    admission_date: data.user.admission_date,
    demission_date: data.user.demission_date,
    status: data.user.status.trim().toLocaleLowerCase(),
  };

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

  return { user, equipments };
}

export function useFindUser(
  userId: string,
  options?: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery(["user", userId], () => getUser(userId), {
    staleTime: 1000 * 60, // 60 minutes
    ...options,
  }) as UseQueryResult<User, unknown>;
}
