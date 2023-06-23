export interface AssignEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  department_id: number;
}

export interface TriggerAssignEquipmentProps {
  userName: string;
  departmentId: number;
}
