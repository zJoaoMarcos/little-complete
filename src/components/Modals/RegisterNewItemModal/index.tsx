import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { NewItemForm } from "./NewItemForm";
import { RegisterNewItemModalProps } from "./types";

export function RegisterNewItemModal({
  isOpen,
  onClose,
}: RegisterNewItemModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Novo Item</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <NewItemForm />
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="purple">
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
