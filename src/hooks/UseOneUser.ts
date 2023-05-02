import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

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

  return { user };
}

export function useOneUser(userId: string, options: UseQueryOptions) {
  return useQuery(["user"], () => getOneUser(userId), {
    staleTime: 1000 * 5, // 5 minutes
    ...options,
  }) as UseQueryResult<User, unknown>;
}
