import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";
import { DeleteModal } from "./index";

interface TriggerDeleteProps {
  id: string;
  name: string;
}

export function TriggerDelete({ id, name }: TriggerDeleteProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="delete"
        onClick={onOpen}
        icon={<Trash weight="fill" />}
        textColor="red.500"
        borderRadius="full"
        bg="transparent"
      />

      <DeleteModal isOpen={isOpen} onClose={onClose} id={id} name={name} />
    </>
  );
}
