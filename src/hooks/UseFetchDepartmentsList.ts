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
  departments: Department[];
  totalCount: number;
}

export async function getDepartmentsList(skip = 0, take = 0): Promise<Data> {
  const { data } = await backend.get<Data>(
    `/departments?skip=${skip}&take=${take}`
  );

  const departments = data.departments.map((department) => {
    return {
      id: department.id,
      name: formatData(department.name),
      cost_center: department.cost_center,
      is_board: department.is_board,
      board: department.board ? formatData(department.board) : null,
      responsible_id: department.responsible_id
        ? department.responsible_id
        : null,
    };
  });

  const totalCount = data.totalCount;

  return { departments, totalCount };
}

export function useFetchDepartmentsList(page?: number, skip = 0, take = 0) {
  return useQuery(["departments", page], () => getDepartmentsList(skip, take), {
    staleTime: 1000 * 60, //60 minutes
  });
}
