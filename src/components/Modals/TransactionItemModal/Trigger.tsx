import { Button, useDisclosure } from "@chakra-ui/react";
import { ArrowClockwise } from "@phosphor-icons/react";

import { TransactionStockItemModal } from ".";
import { TriggerTransactionStockItemProps } from "./types";

export function TriggerTransactionStockItem({
  item,
}: TriggerTransactionStockItemProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onClick={onOpen}
        colorScheme="purple"
        w="full"
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
