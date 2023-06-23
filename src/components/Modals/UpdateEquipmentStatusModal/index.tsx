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

import { Select } from "@/components/Form/Select";
import { UpdateEquipmentStatusModalProps } from "./hooks/types";
import { useUpdateEquipmentStatus } from "./hooks/useUpdateEquipmentStatus";

const defaultStatusOptions = [
  { value: "available", option: "Disponivel" },
  { value: "maintenance", option: "Manutenção" },
  { value: "disabled", option: "Descarte" },
];

export function UpdateEquipmentStatusModal({
  isOpen,
  onClose,
  equipment_id,
  currentStatus,
}: UpdateEquipmentStatusModalProps) {
  const filterStatusOptions = defaultStatusOptions.filter(
    (status) => status.value !== currentStatus
  );

  const { handleSubmit, handleUpdateStatus, isDirty, isSubmitting, register } =
    useUpdateEquipmentStatus(equipment_id);

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
          Alterar status de{" "}
          <Text as="span" color="purple.500">
            {equipment_id}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as="form"
          id="update_status"
          onSubmit={handleSubmit(handleUpdateStatus)}
        >
          <Select {...register("status")} placeholder="Selecione o Status">
            {filterStatusOptions.map((status, i) => {
              return (
                <option key={i} value={status.value}>
                  {status.option}
                </option>
              );
            })}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button
            form="update_status"
            colorScheme="purple"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isDirty}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
