import { z } from "zod";

export const updateEquipmentSchema = z.object({
  id: z.string(),
  type: z.string().nonempty(),
  patrimony: z.string().nonempty(),
  brand: z.nullable(z.string()),
  model: z.nullable(z.string()),
  supplier: z.nullable(z.string()),
  invoice: z.nullable(z.string()),
  warranty: z.nullable(z.string()),
  purchase_date: z.nullable(z.coerce.date()),
  cpu: z.nullable(z.string()),
  ram: z.nullable(z.string()),
  video: z.nullable(z.string()),
  slots: z.nullable(z.coerce.number()),
  storage0_type: z.nullable(z.string()),
  storage0_syze: z.nullable(z.coerce.number()),
  storage1_type: z.nullable(z.string()),
  storage1_syze: z.nullable(z.coerce.number()),
  service_tag: z.nullable(z.string()),
  department_id: z.coerce.number(),
});
