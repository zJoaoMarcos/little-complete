import { Button, useDisclosure } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { AssociateEquipmenteModal } from ".";

export function TriggerAssociateEquipment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<Plus />} colorScheme="purple" w="56">
        Atribuir Equipamento
      </Button>

      <AssociateEquipmenteModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
