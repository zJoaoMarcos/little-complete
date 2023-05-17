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
  admission_date: Date | null;
  demission_date: Date | null;
  status: string | null;
}

interface Data {
  users: User[];
  totalCount: number;
}

export async function getUsersListByDepartment(
  id: number,
  skip = 0,
  take = 0
): Promise<Data> {
  const { data } = await backend.get<Data>(
    `users/department/${id}?skip=${skip}&take=${take}`
  );

  const users = data.users.map((user) => {
    return {
      user_name: user.user_name.trim(),
      complete_name: concatFirstNameAndLastName(user.complete_name),
      title: formatData(user.title),
      department: {
        id: user.department.id,
        name: formatData(user.department.name),
      },
      telephone: user.telephone ? user.telephone : null,
      direct_boss: user.direct_boss,
      smtp: user.smtp.trim(),
      admission_date: user.admission_date ? user.demission_date : null,
      demission_date: user.demission_date ? user.demission_date : null,
      status: user.status ? user.status.trim() : null,
    };
  });

  const totalCount = data.totalCount;

  return { users, totalCount };
}

export function useFetchUsersListByDepartment(
  id: number,
  page = 1,
  skip = 0,
  take = 0
) {
  return useQuery(
    [`users-by-department-${id}`, page],
    () => getUsersListByDepartment(id, skip, take),
    {
      staleTime: 1000 * 60, // 60 minutes
    }
  );
}
