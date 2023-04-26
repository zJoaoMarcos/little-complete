import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface ChangeStatusProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangeStatusModal({ isOpen, onClose }: ChangeStatusProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Alterar Status <Text textColor="pink.500"></Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button form="update_item" type="submit" colorScheme="purple">
            Alterar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
