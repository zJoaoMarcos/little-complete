import { Input } from "@/components/Form/input";
import {
  AlertDialog,
  AlertDialogOverlay,
  Box,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteModal({ isOpen, onClose }: ModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />
      <ModalContent>
        <ModalHeader>
          Excluir <Text textColor="pink.500">SSD 240Gb Kingston </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form">
            <Text>
              Por favor digite{" "}
              <Text as="span" fontWeight="semibold">
                João Matos/SDD
              </Text>{" "}
              para confirmar
            </Text>

            <Input name="delete" />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            w="full"
            variant="outline"
            color="red.500"
            borderColor="red.500"
          >
            Eu entendo as consequências, excluir este item
          </Button>
        </ModalFooter>
      </ModalContent>
    </AlertDialog>
  );
}
