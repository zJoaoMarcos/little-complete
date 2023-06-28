import { z } from "zod";
import { updateEquipmentSchema } from "./schema";

export type UpdateEquipmentData = z.infer<typeof updateEquipmentSchema>;

export interface UseUpdateEquipmentParams {
  equipment: {
    id: string;
    status: string;
    currentUser: string | null;
    patrimony: string;
    type: string;
    brand: string | null;
    model: string | null;
    serviceTag: string | null;
    purchase: {
      invoice: string | null;
      supplier: string | null;
      purchaseDate: Date | null;
      warranty: string | null;
    };
    department: {
      id: number | null;
      name: string | null;
    };
    config: {
      cpu: string | null;
      ram: string | null;
      video: string | null;
      storage: {
        slots: number | null;
        storage0Type: string | null;
        storage0Syze: number | null;
        storage1Type: string | null;
        storage1Syze: number | null;
      };
    };
  };
}
