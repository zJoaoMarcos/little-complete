import { Button, useDisclosure } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { CreateEquipmentModal } from ".";

export function CreateEquipmentTrigger() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<Plus />} colorScheme="purple">
        Novo Equipamento
      </Button>

      <CreateEquipmentModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
