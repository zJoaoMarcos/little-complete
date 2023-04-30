import { backend } from "@/lib/backendApi";
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

  const user = data.user;

  return { user };
}

export function useOneUser(userId: string, options: UseQueryOptions) {
  return useQuery(["user"], () => getOneUser(userId), {
    staleTime: 1000 * 5, // 5 minutes
    ...options,
  }) as UseQueryResult<User, unknown>;
}
