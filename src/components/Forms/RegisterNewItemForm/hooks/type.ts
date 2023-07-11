import { z } from "zod";
import { RegisterNewItemSchema } from "./schema";

export type RegisterNewItemData = z.infer<typeof RegisterNewItemSchema>;
