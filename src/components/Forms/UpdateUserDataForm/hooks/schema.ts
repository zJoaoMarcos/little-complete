import { z } from "zod";

export const UpdateUserSchema = z.object({
  user_name: z.string(),
  complete_name: z.string(),
  title: z.string(),
  department_id: z.coerce.number(),
  telephone: z.coerce.number().nullable(),
  direct_boss: z.string(),
  smtp: z.string(),
  demission_date: z.coerce.date().nullable(),
  admission_date: z.coerce.date().nullable(),
});
