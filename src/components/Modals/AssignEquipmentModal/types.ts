import { RadioProps } from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

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

interface Equipment {
  id: string;
  status: string;
  currentUser: string | null;
  patrimony: string | null;
  type: string | null;
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
}

export interface EquipmentRadioCardProps extends RadioProps {
  children: ReactNode;
}

export interface EquipmentRadioGroupProps {
  setValue: Dispatch<SetStateAction<string>>;
  equipments: Equipment[];
}

export interface EquipmentAccordionProps {
  equipment: Equipment;
}

export interface EquipmentDetailProps {
  label: string | null;
  value: string | number | null;
}
