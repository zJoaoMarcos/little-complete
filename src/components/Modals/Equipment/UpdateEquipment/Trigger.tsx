import { Button, useDisclosure } from "@chakra-ui/react";
import { PencilSimple } from "@phosphor-icons/react";
import { UpdateEquipmentModal } from ".";

interface UpdateEquipmentTriggerProps {
  equipment: {
    id: string;
    brand: string;
    model: string;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: string | null;
    department: string;
    status: string;
    cpu: string | null;
    ram: string | null;
    slots: number | null;
    storage0_type: string | null;
    storage0_syze: number | null;
    storage1_type: string | null;
    storage1_syze: number | null;
    video: string | null;
    service_tag: string | null;
  };
}

export function UpdateEquipmentTrigger({
  equipment,
}: UpdateEquipmentTriggerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<PencilSimple />} colorScheme="purple">
        Editar
      </Button>

      <UpdateEquipmentModal
        isOpen={isOpen}
        onClose={onClose}
        equipment={equipment}
      />
    </>
  );
}
