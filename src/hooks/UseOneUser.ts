import { backend } from "@/lib/api";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

interface User {
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
}

interface Data {
  user: User;
}

export async function getOneUser(userId: string): Promise<Data> {
  const { data } = await backend.get<Data>(`/users/${userId}`);

  const user = data.user;

  return { user };
}

export function useUser(userId: string, options: UseQueryOptions) {
  return useQuery(["user"], () => getOneUser(userId), {
    staleTime: 1000 * 5, // 5 minutes
    ...options,
  }) as UseQueryResult<Data, unknown>;
}
