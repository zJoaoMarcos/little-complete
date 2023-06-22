import { Button, useDisclosure } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { RegisterNewItemModal } from ".";

export function TriggerNewItemModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} leftIcon={<Plus />} colorScheme="purple">
        Novo
      </Button>

      <RegisterNewItemModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
