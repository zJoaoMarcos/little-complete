import { z } from "zod";
import { UpdatePasswordSchema } from "./schema";

export type UpdatePasswordData = z.infer<typeof UpdatePasswordSchema>;
