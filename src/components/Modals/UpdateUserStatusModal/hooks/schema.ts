import { z } from "zod";

export const UpdateUserStatusSchema = z.object({
  user_name: z.string().nonempty(),
  status: z.string().nonempty(),
});
