import { Button, useDisclosure } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";

export function TriggerNewItemModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<Plus />}>Novo</Button>
    </>
  );
}
