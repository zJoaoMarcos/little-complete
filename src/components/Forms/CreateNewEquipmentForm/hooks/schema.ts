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
  purchaseDate: z.coerce.date().nullable(),
  cpu: z.string().nullable(),
  ram: z.string().nullable(),
  slots: z.coerce.number().nullable(),
  storage0Type: z.string().nullable(),
  storage0Syze: z.coerce.number().nullable(),
  storage1Type: z.string().nullable(),
  storage1Syze: z.coerce.number().nullable(),
  video: z.string().nullable(),
  serviceTag: z.string().nullable(),
});
