import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Pencil } from "@phosphor-icons/react";
import { EditModal } from "./index";

interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  amount: number;
  amount_min: number;
  local: string;
}

interface TriggerEditProps {
  item: Item;
}

export function TriggerEdit({ item }: TriggerEditProps) {
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

      <EditModal isOpen={isOpen} onClose={onClose} item={item} />
    </>
  );
}
