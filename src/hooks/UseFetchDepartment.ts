import { backend } from "@/lib/backendApi";
import { useQuery } from "react-query";

interface Department {
  id: number;
  name: string;
  cost_center: string;
  is_board: boolean;
  board: string;
  responsible_id: string;
}

interface Data {
  department: Department;
}

export async function getDepartment(id: number): Promise<Data> {
  const { data } = await backend.get<Data>(`/departments/${id}`);

  const department = data.department;

  return { department };
}

export function useFetchDepartment(id: number) {
  return useQuery(["departments"], () => getDepartment(id), {
    staleTime: 1000 * 5,
  });
}
