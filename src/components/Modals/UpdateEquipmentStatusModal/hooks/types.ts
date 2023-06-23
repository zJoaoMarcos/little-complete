import { z } from "zod";
import { UpdateEquipmentStatusSchema } from "./schema";

export type UpdateEquipmentStatusData = z.infer<
  typeof UpdateEquipmentStatusSchema
>;

export interface UpdateEquipmentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment_id: string;
  currentStatus: string;
}
