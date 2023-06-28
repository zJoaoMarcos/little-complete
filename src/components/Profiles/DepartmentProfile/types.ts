export interface DepartmentProfileProps {
  department: {
    id: number;
    name: string;
    cost_center: number;
    is_board: boolean;
    board: string;
    responsible_id: string;
  };
}

export interface ProfileTabsProps {
  department: {
    id: number;
    name: string;
    cost_center: number | null;
    is_board: boolean | null;
    board: string | null;
    responsible_id: string | null;
  };
}
