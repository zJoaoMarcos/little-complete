import axios from "axios";
import { useQuery } from "react-query";

interface Item {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: string;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: string;
  demission_date: string | null;
  status: string;
}

interface Data {
  users: Item[];
  totalCount: number;
}

export async function getUser(skip: number, take: number): Promise<Data> {
  const { data } = await axios.get<Data>("http://localhost:3001/users");

  const users = data.users.map((user) => {
    return {
      user_name: user.user_name,
      complete_name: user.complete_name,
      title: user.title,
      department_id: user.department_id,
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

export function useUserList(page: number, skip: number, take: number) {
  return useQuery(["user", page], () => getUser(skip, take), {
    staleTime: 1000 * 5,
  });
}
