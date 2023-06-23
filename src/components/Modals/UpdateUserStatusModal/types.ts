export interface TriggerAssignEquipmentProps {
  useName: string;
  currentStatus: string;
  isIconButton?: boolean;
}

export interface UpdateUserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  currentStatus: string;
}
