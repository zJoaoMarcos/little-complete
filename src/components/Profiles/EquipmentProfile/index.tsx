import { Divider } from "@chakra-ui/react";
import { EquipmentDetails } from "./EquipmentDetails";
import { EquipmentHeader } from "./EquipmentHeader";

interface EquipmentProfileProps {
  equipment: {
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
  };
}

export function EquipmentProfile({ equipment }: EquipmentProfileProps) {
  return (
    <>
      <EquipmentHeader equipment={equipment} />

      <Divider />

      <EquipmentDetails equipment={equipment!} />
    </>
  );
}
