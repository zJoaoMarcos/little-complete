import { z } from "zod";
import { createDepartmentSchema } from "./schema";

export type CreateDepartmentData = z.infer<typeof createDepartmentSchema>;
