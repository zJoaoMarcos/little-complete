import { z } from "zod";

export const UpdateEquipmentStatusSchema = z.object({
  equipment_id: z.string().nonempty(),
  status: z.string().nonempty(),
});
