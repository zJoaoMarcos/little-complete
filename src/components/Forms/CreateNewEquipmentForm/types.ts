import { z } from "zod";
import { createEquipmetSchema } from "./schema";

export type CreateEquipmentData = z.infer<typeof createEquipmetSchema>;
