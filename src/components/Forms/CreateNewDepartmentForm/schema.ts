import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().nonempty(),
  cost_center: z.coerce.number(),
  is_board: z.boolean(),
  board: z.string().nonempty(),
  responsible_id: z.string().nonempty(),
});
