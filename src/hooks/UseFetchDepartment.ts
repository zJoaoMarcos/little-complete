import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
import { useQuery } from "react-query";

interface Department {
  id: number;
  name: string;
  cost_center: number | null;
  is_board: boolean | null;
  board: string | null;
  responsible_id: string | null;
}

interface Data {
  department: Department;
}

export async function getDepartment(id: number): Promise<Data> {
  const { data } = await backend.get<Data>(`/departments/${id}`);

  const department = {
    id: data.department.id,
    name: formatData(data.department.name),
    cost_center: data.department.cost_center,
    is_board: data.department.is_board,
    board: data.department.board ? formatData(data.department.board) : null,
    responsible_id: data.department.responsible_id,
  };

  return { department };
}

export function useFetchDepartment(id: number) {
  return useQuery(["departments"], () => getDepartment(id), {
    staleTime: 1000 * 5,
  });
}
