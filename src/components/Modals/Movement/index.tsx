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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MovementModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Moviment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Vai Movimentar, nerdola?</ModalBody>

        <ModalFooter>
          <Button>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
