import { IconButton, useDisclosure } from "@chakra-ui/react";
import { DotsThreeVertical } from "@phosphor-icons/react";

import { EditStockItemModal } from ".";
import { TriggerEditStockItemProps } from "./types";

export function TriggerEditStockItem({ item }: TriggerEditStockItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        size="sm"
        aria-label="edit-item"
        onClick={onOpen}
        icon={<DotsThreeVertical size="20" />}
        borderRadius="full"
        bgColor="transparent"
        _hover={{ borderColor: "purple.100", border: "1px" }}
      />

      <EditStockItemModal isOpen={isOpen} onClose={onClose} item={item} />
    </>
  );
}
