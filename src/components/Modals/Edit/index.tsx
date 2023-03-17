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

export function EditModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Vai Editar, nerdola?</ModalBody>

        <ModalFooter>
          <Button>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
