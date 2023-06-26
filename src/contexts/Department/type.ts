import { Dispatch, ReactNode, SetStateAction } from "react";
import { UseMutationResult } from "react-query";

interface Department {
  id: number;
  name: string;
  cost_center: number | null;
  is_board: boolean | null;
  board: string | null;
  responsible_id: string | null;
}

export interface DepartmentProps {
  departments: Department[];
  totalCount: number;
}

export interface UpdateDepartmentData {
  id: number;
  name: string | null;
  cost_center: number | null;
  is_board: boolean | null;
  board: string | null;
  responsible_id: string | null;
}

export interface DepartmentsProviderProps {
  children: ReactNode;
}

export interface DepartmentProviderContextData {
  data: DepartmentProps | undefined;
  isFetching: boolean;
  isLoading: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  take: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;

  updateDepartment: UseMutationResult<
    UpdateDepartmentData,
    unknown,
    UpdateDepartmentData,
    unknown
  >;
}
