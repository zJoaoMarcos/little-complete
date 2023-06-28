import { z } from "zod";
import { UpdateUserSchema } from "./schema";

export type UpdateUserData = z.infer<typeof UpdateUserSchema>;

export interface UseUpdateUserParams {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department: { id: number; name: string };
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date | null;
    demission_date: Date | null;
    status: string | null;
  };
}
