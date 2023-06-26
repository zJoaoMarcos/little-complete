import { z } from "zod";

export const createUserSchema = z.object({
  user_name: z.string().nonempty(),
  complete_name: z.string().nonempty(),
  title: z.string(),
  department_id: z.coerce.number(),
  telephone: z.coerce.number().nullable(),
  direct_boss: z.string().nonempty(),
  smtp: z.string().nonempty(),
});
