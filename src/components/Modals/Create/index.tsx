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

export function CreateModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Vai criar, nerdola?</ModalBody>

        <ModalFooter>
          <Button>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
