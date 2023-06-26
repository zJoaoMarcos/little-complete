import { z } from "zod";

import { createUserSchema } from "./schema";

export type CreateUserData = z.infer<typeof createUserSchema>;
