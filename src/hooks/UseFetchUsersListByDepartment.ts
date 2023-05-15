import { backend } from "@/lib/backendApi";
import { concatFirstNameAndLastName } from "@/utils/concatFIrstNameAndLastName";
import { formatData } from "@/utils/formatData";
import { useQuery } from "react-query";

interface User {
  user_name: string;
  complete_name: string | null;
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

export async function getUsersListByDepartment(
  id: number,
  skip: number,
  take: number
): Promise<Data> {
  const { data } = await backend.get<Data>(
    `/users/department/${id}?skip=${skip}&take=${take}`
  );

  console.log(data);

  const users = data.users.map((user) => {
    return {
      user_name: user.user_name.trim(),
      complete_name: user.complete_name
        ? concatFirstNameAndLastName(user.complete_name)
        : null,
      title: formatData(user.title),
      department: {
        id: user.department.id,
        name: user.department.name ? formatData(user.department.name) : null,
      },
      telephone: user.telephone,
      direct_boss: user.direct_boss,
      smtp: user.smtp,
      admission_date: user.admission_date,
      demission_date: user.demission_date ? user.demission_date : null,
      status: user.status,
    };
  });

  const totalCount = data.totalCount;

  return { users, totalCount };
}

export function useFetchUsersListByDepartment(
  id: number,
  page?: number,
  skip?: number,
  take?: number
) {
  return useQuery(
    ["user", page],
    () => getUsersListByDepartment(id, (skip = 0), (take = 0)),
    {
      staleTime: 1000 * 5,
    }
  );
}
