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
  VStack,
} from "@chakra-ui/react";

import { Input } from "@/components/Form/input";
import { Archive } from "@phosphor-icons/react";
import { EditStockItemModalProps } from "./types";

export function EditStockItemModal({
  item,
  isOpen,
  onClose,
}: EditStockItemModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          Editar <Text as="span">{item.model}</Text>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody as="form">
          <VStack spacing="2">
            <Input name="brand" label="Fabricante" />
            <Input name="model" label="Modelo" />
            <Input name="type" label="Tipo" />
            <Input name="category" label="Category" />
            <Input name="amount" label="Amount" />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button leftIcon={<Archive />}>Salvar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
