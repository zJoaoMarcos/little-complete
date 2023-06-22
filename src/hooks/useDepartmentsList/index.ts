import { api } from "@/services/api";
import { formatData } from "@/utils/formatData";
import { useQuery } from "react-query";
import { Data, FetchParams } from "./types";

export async function getDepartmentsList({
  skip = 0,
  take = 0,
  id,
}: FetchParams): Promise<Data> {
  const { data } = await api.get<Data>(
    `/departments?skip=${skip}&take=${take}&id=${id}`
  );

  const departments = data.departments.map((department) => {
    return {
      id: department.id,
      name: formatData(department.name)!,
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

export function useDepartmentsList({
  key = "departments",
  page = 1,
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
