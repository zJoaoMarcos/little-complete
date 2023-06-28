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
  purchaseDate: z.nullable(z.coerce.date()),
  cpu: z.nullable(z.string()),
  ram: z.nullable(z.string()),
  video: z.nullable(z.string()),
  slots: z.nullable(z.coerce.number()),
  storage0Type: z.nullable(z.string()),
  storage0Syze: z.nullable(z.coerce.number()),
  storage1Type: z.coerce.string().nullable(),
  storage1Syze: z.nullable(z.coerce.number()),
  serviceTag: z.nullable(z.string()),
  departmentId: z.coerce.number(),
});
