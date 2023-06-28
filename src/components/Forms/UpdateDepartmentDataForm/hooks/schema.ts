import { z } from "zod";

export const updateDepartmentSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  cost_center: z.coerce.number().nullable(),
  is_board: z.boolean().nullable(),
  board: z.string().nullable(),
  responsible_id: z.string().nullable(),
});
