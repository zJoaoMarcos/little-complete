export interface UnassignEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentId: string;
}

export interface TriggerAssignEquipmentProps {
  equipmentId: string;
}
