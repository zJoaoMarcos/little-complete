import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
import { useQuery } from "react-query";

interface Equipment {
  id: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department: { id: number; name: string };
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
    department: { id: number; name: string };
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date | null;
    demission_date: Date | null;
    status: string;
  };
  equipments: Equipment[];
}

export async function getUser(userId: string): Promise<User> {
  const { data } = await backend.get<User>(`users/${userId}`);

  const user = {
    user_name: data.user.user_name.trim(),
    complete_name: formatData(data.user.complete_name),
    title: formatData(data.user.title),
    department: {
      id: data.user.department.id,
      name: formatData(data.user.department.name),
    },
    telephone: data.user.telephone ? data.user.telephone : null,
    direct_boss: data.user.direct_boss,
    smtp: data.user.smtp.trim(),
    admission_date: data.user.admission_date ? data.user.demission_date : null,
    demission_date: data.user.demission_date ? data.user.demission_date : null,
    status: data.user.status.trim(),
  };

  const equipments = data.equipments.map((equipment) => {
    return {
      id: equipment.id.trim(),
      brand: equipment.brand,
      model: equipment.model,
      supplier: equipment.supplier ? equipment.supplier : null,
      invoice: equipment.invoice,
      warranty: equipment.warranty,
      purchase_date: equipment.purchase_date,
      department: {
        id: data.user.department.id,
        name: formatData(data.user.department.name),
      },
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

export function useFindUser(userId: string) {
  return useQuery([`user-${userId}`], () => getUser(userId), {
    staleTime: 1000 * 60, // 60 minutes
  });
}
