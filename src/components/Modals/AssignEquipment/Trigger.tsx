import { Button, useDisclosure } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";

import { AssignEquipmentModal } from ".";
import { TriggerAssignEquipmentProps } from "./types";

export function TriggerAssignEquipment({
  userName,
  departmentId,
}: TriggerAssignEquipmentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<Plus />} colorScheme="purple" w="56">
        Atribuir Equipamento
      </Button>

      <AssignEquipmentModal
        isOpen={isOpen}
        onClose={onClose}
        username={userName}
        department_id={departmentId}
      />
    </>
  );
}
