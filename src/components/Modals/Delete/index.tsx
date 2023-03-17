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

export function DeleteModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Vai deletar, nerdola?</ModalBody>

        <ModalFooter>
          <Button>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
