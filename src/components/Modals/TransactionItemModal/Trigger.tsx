import { Button, useDisclosure } from "@chakra-ui/react";
import { ArrowClockwise } from "@phosphor-icons/react";
import { TransactionStockItemModal } from ".";
import { TriggerEditStockItemProps } from "../EditStockItemModal/types";

export function TriggerTransactionStockItem({
  item,
}: TriggerEditStockItemProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onClick={onOpen}
        colorScheme="purple"
        leftIcon={<ArrowClockwise />}
      >
        Movimentar
      </Button>

      <TransactionStockItemModal
        isOpen={isOpen}
        onClose={onClose}
        item={item}
      />
    </>
  );
}
