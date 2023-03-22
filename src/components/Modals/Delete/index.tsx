import { Input } from "@/components/Form/input";
import { useStock } from "@/contexts/StockContext";
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
import { SubmitHandler, useForm } from "react-hook-form";

interface DeleteItemData {
  text_confirmation?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  name: string;
}

export function DeleteModal({ isOpen, onClose, id, name }: ModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const { register, handleSubmit, formState, reset, watch } =
    useForm<DeleteItemData>();
  const { errors, isSubmitting } = formState;
  const text_confirmation = watch("text_confirmation");
  const { deleteItem } = useStock();

  const handleDeleteItem: SubmitHandler<DeleteItemData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await deleteItem.mutateAsync(id);

    onClose();
    reset();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay />
      <ModalContent>
        <ModalHeader>
          Excluir <Text textColor="pink.500">{name}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            onSubmit={handleSubmit(handleDeleteItem)}
            id="delete_item"
          >
            <Text>
              Por favor digite{" "}
              <Text as="span" fontWeight="semibold" id="text">
                {name}
              </Text>{" "}
              para confirmar
            </Text>

            <Input
              {...register("text_confirmation")}
              error={errors.text_confirmation}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            form="delete_item"
            type="submit"
            w="full"
            variant="outline"
            color="red.500"
            borderColor="red.500"
            isDisabled={name === text_confirmation ? false : true}
            isLoading={isSubmitting}
          >
            Eu entendo as consequências, excluir este item
          </Button>
        </ModalFooter>
      </ModalContent>
    </AlertDialog>
  );
}
