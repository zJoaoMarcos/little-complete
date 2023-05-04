import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

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

interface User {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department_id: string;
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date;
    demission_date: Date | null;
    status: string;
  };
  equipments: Equipment[];
}

export async function getOneUser(userId: string): Promise<User> {
  const { data } = await backend.get<User>(`users/${userId}`);

  const user = {
    user_name: data.user.user_name.trim(),
    complete_name: formatData(data.user.complete_name),
    title: formatData(data.user.title),
    department_id: formatData(data.user.department_id),
    telephone: data.user.telephone,
    direct_boss: formatData(data.user.direct_boss),
    smtp: data.user.smtp,
    admission_date: data.user.admission_date,
    demission_date: data.user.demission_date,
    status: data.user.status,
  };

  const equipments = data.equipments.map((equipment) => {
    return {
      id: equipment.id,
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

  return { user, equipments };
}

export function useOneUser(userId: string, options: UseQueryOptions) {
  return useQuery(["user"], () => getOneUser(userId), {
    staleTime: 1000 * 5, // 5 minutes
    ...options,
  }) as UseQueryResult<User, unknown>;
}
