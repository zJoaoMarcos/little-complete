import { z } from "zod";

import { UpdateUserStatusSchema } from "./schema";

export type UpdateUserStatusData = z.infer<typeof UpdateUserStatusSchema>;
