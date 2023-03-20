import { Input } from "@/components/Form/input";
import { Select } from "@/components/Form/Select";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateModal({ isOpen, onClose }: ModalProps) {
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
        <ModalHeader>Novo Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form">
            <Stack spacing="4">
              <Input name="item" label="Item" />

              <Input name="description" label="Descrição" />

              <Select
                name="type"
                label="Tipo"
                placeholder="Hardware, Periféricos, etc..."
              >
                <option value="hardware">Hardware</option>
                <option value="peripheral">Periférico</option>
                <option value="extension">Ramal</option>
              </Select>

              <Input name="quantity" label="Quantidade" type="number" />

              <Input
                name="min_quantity"
                label="Quantidade Mínima"
                type="number"
              />

              <Select
                name="place"
                label="Local"
                placeholder="Selecione o local"
              >
                <option value="8° Andar">8° Andar</option>
                <option value="-1° Andar">-1° Andar</option>
              </Select>
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="pink"> Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
