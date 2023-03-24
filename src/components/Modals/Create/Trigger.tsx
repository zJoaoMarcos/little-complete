import { Button, useDisclosure } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { CreateModal } from ".";

export function TriggerCreate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<Plus />} colorScheme="purple">
        Novo
      </Button>

      <CreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
