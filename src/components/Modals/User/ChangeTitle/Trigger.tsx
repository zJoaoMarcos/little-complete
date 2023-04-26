import { Button, useDisclosure } from "@chakra-ui/react";
import { Pencil } from "@phosphor-icons/react";
import { ChangeTitleModal } from ".";

export function TriggerChangeTitle() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<Pencil />} colorScheme="purple">
        Cargo
      </Button>

      <ChangeTitleModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
