import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Prohibit } from "@phosphor-icons/react";
import { UnassignEquipmentModal } from ".";

interface TriggerAssignEquipment {
  equipmentId: string;
}

export function TriggerUnassignEquipment({
  equipmentId,
}: TriggerAssignEquipment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="unassign_equip"
        icon={<Prohibit size={22} />}
        bg="none"
      />

      <UnassignEquipmentModal
        isOpen={isOpen}
        onClose={onClose}
        equipmentId={equipmentId}
      />
    </>
  );
}
