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

interface FetchParams {
  key?: string;
  page?: number;
  skip?: number;
  take?: number;
  id?: string;
}

export async function getDepartmentsList({
  skip = 0,
  take = 0,
  id,
}: FetchParams): Promise<Data> {
  const { data } = await backend.get<Data>(
    `/departments?skip=${skip}&take=${take}&id=${id}`
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

export function useFetchDepartmentsList({
  key = "departments",
  page,
  id = "",
  skip = 0,
  take = 0,
}: FetchParams) {
  return useQuery(
    [key, page + id],
    () => getDepartmentsList({ skip, take, id }),
    {
      staleTime: 1000 * 60, //60 minutes
    }
  );
}
