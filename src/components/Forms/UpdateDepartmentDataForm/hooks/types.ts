import { z } from "zod";
import { updateDepartmentSchema } from "./schema";

export type UpdateDepartmentData = z.infer<typeof updateDepartmentSchema>;

export interface UseUpdateDepartmentParams {
  department: {
    id: number;
    name: string;
    cost_center: number | null;
    is_board: boolean | null;
    board: string | null;
    responsible_id: string | null;
  };
}
