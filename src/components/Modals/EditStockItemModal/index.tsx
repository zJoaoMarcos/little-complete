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
import { UseEditStockItem } from "./hooks/UseEditStockItem";
import { EditStockItemModalProps } from "./types";

export function EditStockItemModal({
  item,
  isOpen,
  onClose,
}: EditStockItemModalProps) {
  const { register, errors, handleSubmit, handleEditItem } = UseEditStockItem({
    item,
  });

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

        <ModalBody
          as="form"
          id="update_item"
          onSubmit={handleSubmit(handleEditItem)}
        >
          <VStack spacing="2">
            <Input
              {...register("brand")}
              error={errors.brand}
              label="Fabricante"
            />
            <Input {...register("model")} error={errors.model} label="Modelo" />
            <Input {...register("type")} error={errors.type} label="Tipo" />
            <Input
              {...register("category")}
              error={errors.category}
              label="Category"
            />
          </VStack>
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
