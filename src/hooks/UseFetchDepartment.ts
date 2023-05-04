import { backend } from "@/lib/backendApi";
import { useQuery } from "react-query";

interface Department {
  name: string;
  cost_center: string;
  is_board: boolean;
  board: string;
}

interface Data {
  department: Department;
}

export async function getDepartment(id: string): Promise<Data> {
  const { data } = await backend.get<Data>(`/departments/id/id=${id}`);

  const department = data.department;

  return { department };
}

export function useFetchDepartment(id: string) {
  return useQuery(["departments"], () => getDepartment(id), {
    staleTime: 1000 * 5,
  });
}
