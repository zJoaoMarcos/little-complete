import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Pencil } from "@phosphor-icons/react";
import { EditModal } from "./index";

export function TriggerEdit() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="edit"
        icon={<Pencil />}
        onClick={onOpen}
        borderRadius="full"
        bg="transparent"
      />

      <EditModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
