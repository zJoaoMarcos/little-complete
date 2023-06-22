export type Department = {
  id: number;
  name: string;
  cost_center: number | null;
  is_board: boolean | null;
  board: string | null;
  responsible_id: string | null;
};

export type Data = {
  departments: Department[];
  totalCount: number;
};

export interface FetchParams {
  key?: string;
  page?: number;
  skip?: number;
  take?: number;
  id?: string;
}
