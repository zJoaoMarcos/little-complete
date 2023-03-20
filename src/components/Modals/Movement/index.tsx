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
  Text,
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MovementModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Movimentação <Text textColor="pink.500">SSD 240Gb Kingston </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box as="form">
            <Stack>
              <Select
                name="type"
                label="Tipo"
                placeholder="Entrada ou Saida?"
                isRequired
              >
                <option value="input">Entrada</option>
                <option value="output">Saída</option>
              </Select>

              <Input
                name="requester"
                label="Requisitante"
                type="text"
                placeholder="Solicitante/Fornecedor"
              />

              <Select
                name="departament"
                label="Departamento"
                placeholder="Selecione o Departamento"
              >
                <option value="ti">Tecnologia da Informação</option>
                <option value="aprovacoes">Aprovações</option>
              </Select>

              <Input
                name="requester"
                label="Quantidade"
                type="number"
                placeholder="0"
              />
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button type="submit">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
