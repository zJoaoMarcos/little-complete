import { backend } from "@/lib/backendApi";
import { formatData } from "@/utils/formatData";
import { useQuery } from "react-query";

interface Department {
  name: string;
  cost_center: string;
  is_board: boolean;
  board: string;
}

interface Data {
  departments: Department[];
  totalCount: number;
}

export async function getDepartmentsList(
  skip: number,
  take: number
): Promise<Data> {
  const { data } = await backend.get<Data>(
    `/departments?skip=${skip}&take=${take}`
  );

  const departments = data.departments.map((department) => {
    return {
      name: formatData(department.name),
      cost_center: department.cost_center,
      is_board: department.is_board,
      board: formatData(department.board),
    };
  });

  const totalCount = data.totalCount;

  return { departments, totalCount };
}

export function useFetchDepartmentsList(
  page: number,
  skip: number,
  take: number
) {
  return useQuery(["departments", page], () => getDepartmentsList(skip, take), {
    staleTime: 1000 * 5,
  });
}
