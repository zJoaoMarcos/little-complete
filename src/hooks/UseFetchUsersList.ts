import { backend } from "@/lib/backendApi";
import { concatFirstNameAndLastName } from "@/utils/concatFIrstNameAndLastName";
import { formatData } from "@/utils/formatData";
import { useQuery } from "react-query";

interface User {
  user_name: string;
  complete_name: string;
  title: string;
  department: { id: number; name: string };
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date;
  demission_date: Date | null;
  status: string;
}

interface Data {
  users: User[];
  totalCount: number;
}

export async function getUsersList(skip: number, take: number): Promise<Data> {
  const { data } = await backend.get<Data>(`/users?skip=${skip}&take=${take}`);

  const users = data.users.map((user) => {
    return {
      user_name: user.user_name.trim(),
      complete_name: concatFirstNameAndLastName(user.complete_name),
      title: formatData(user.title),
      department: {
        id: user.department.id,
        name: formatData(user.department.name),
      },
      telephone: user.telephone,
      direct_boss: user.direct_boss,
      smtp: user.smtp,
      admission_date: user.admission_date,
      demission_date: user.demission_date,
      status: user.status,
    };
  });

  const totalCount = data.totalCount;

  return { users, totalCount };
}

export function useFetchUsersList(page: number, skip: number, take: number) {
  return useQuery(["user", page], () => getUsersList(skip, take), {
    staleTime: 1000 * 5,
  });
}
