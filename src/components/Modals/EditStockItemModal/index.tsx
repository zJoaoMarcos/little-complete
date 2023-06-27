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

import { Archive } from "@phosphor-icons/react";
import { EditItemForm } from "./EditItemForm";
import { EditItemModalProps } from "./types";

export function EditStockItemModal({
  item,
  isOpen,
  onClose,
}: EditItemModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          Editar{" "}
          <Text as="span" color="purple">
            {item.type} - {item.model}
          </Text>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <EditItemForm item={item} onClose={onClose} />
        </ModalBody>

        <ModalFooter>
          <Button
            form="update_item"
            type="submit"
            leftIcon={<Archive />}
            colorScheme="purple"
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
