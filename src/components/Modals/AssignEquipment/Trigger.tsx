import { Button, useDisclosure } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { AssignEquipmentModal } from ".";

interface TriggerAssignEquipment {
  userName: string;
  departmentId: number;
}

export function TriggerAssignEquipment({
  userName,
  departmentId,
}: TriggerAssignEquipment) {
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
