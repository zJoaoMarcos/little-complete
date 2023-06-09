import { Dispatch, SetStateAction } from "react";

interface UsersProps {
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

export interface Data {
  users: UsersProps[];
  totalCount: number;
}

export interface UserProviderProps {
  children: React.ReactNode;
}

export interface StockProviderContextData {
  data: Data | undefined;
  isFetching: boolean;
  isLoading: boolean;
  setFilter: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  take: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
