import { z } from "zod";

export const createEquipmetSchema = z.object({
  id: z.string().nonempty("O id é obrigatório"),
  type: z.string(),
  patrimony: z.string(),
  brand: z.string(),
  model: z.string(),
  supplier: z.string().nullable(),
  invoice: z.string().nullable(),
  warranty: z.string().nullable(),
  department_id: z.coerce.number(),
  purchase_date: z.date().nullable(),
  cpu: z.string().nullable(),
  ram: z.string().nullable(),
  slots: z.coerce.number().nullable(),
  storage0_type: z.string().nullable(),
  storage0_syze: z.coerce.number().nullable(),
  storage1_type: z.string().nullable(),
  storage1_syze: z.coerce.number().nullable(),
  video: z.string().nullable(),
  service_tag: z.string().nullable(),
});
