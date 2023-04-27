import { Button, useDisclosure } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { CreateUserModal } from ".";

export function CreateUserTrigger() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<Plus />} colorScheme="purple">
        Novo Usuário
      </Button>

      <CreateUserModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
