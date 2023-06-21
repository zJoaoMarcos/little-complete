import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { TransactionStockItemModalProps } from "./types";

export function TransactionStockItemModal({
  item,
  isOpen,
  onClose,
}: TransactionStockItemModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          Movimentação do Item: <Text as="span">{item.model}</Text>
        </ModalHeader>

        <ModalBody>Movimenta Movi</ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
