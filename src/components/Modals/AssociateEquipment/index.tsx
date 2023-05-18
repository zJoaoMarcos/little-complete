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
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AvaliableEquipmentsList } from "./AvaliableEquipmentsList";

const associateEquipmentSchema = z.object({
  equipment_id: z.string(),
  username: z.string(),
});

type AssociateEquipmentData = z.infer<typeof associateEquipmentSchema>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AssociateEquipmenteModal({ isOpen, onClose }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AssociateEquipmentData>({
    resolver: zodResolver(associateEquipmentSchema),
  });

  const handleCreateItem: SubmitHandler<AssociateEquipmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    /* await createItem.mutateAsync(data); */

    console.log(data);

    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atribuir Equipamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            onSubmit={handleSubmit(handleCreateItem)}
            id="associate_equipment"
          >
            <Stack spacing="4">Equipmts Avaliable</Stack>

            <AvaliableEquipmentsList />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            form="associate_equipment"
            type="submit"
            colorScheme="purple"
            isLoading={isSubmitting}
          >
            Atribuir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
