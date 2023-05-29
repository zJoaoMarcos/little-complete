import { backend } from "@/lib/backendApi";
import { concatFirstNameAndLastName } from "@/utils/concatFirstNameAndLastName";
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
  status: string;
}

interface Data {
  users: User[];
  totalCount: number;
}

interface FetchParams {
  page?: number;
  skip?: number;
  take?: number;
  id?: string;
  departmentId?: number;
  status?: string;
  key?: string;
}

export async function getUsersList({
  skip = 0,
  take = 0,
  id,
  status = "",
  departmentId,
}: FetchParams): Promise<Data> {
  if (status == "todos") {
    status = "";
  }

  const department_id = departmentId ? `&department_id=${departmentId}` : "";
  const { data } = await backend.get<Data>(
    `/users?equipments?skip=${skip}&take=${take}&id=${id}&status=${status}${department_id}`
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
      telephone: user.telephone,
      direct_boss: user.direct_boss.trim(),
      smtp: user.smtp.trim(),
      admission_date: user.admission_date,
      demission_date: user.demission_date,
      status: user.status.trim(),
    };
  });

  const totalCount = data.totalCount;

  return { users, totalCount };
}

export function useFetchUsersList({
  key = "users",
  page,
  skip = 0,
  take = 0,
  id = "",
  status = " ",
  departmentId,
}: FetchParams) {
  return useQuery(
    [key, page + id + status],
    () => getUsersList({ skip, take, id, status, departmentId }),
    {
      staleTime: 1000 * 60, // 60 minutes
      enabled: true,
    }
  );
}
