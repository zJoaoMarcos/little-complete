import { Select } from "@/components/Form/Select";
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
import { useUpdateUserStatus } from "./hooks/useUpdateUserStatus";
import { UpdateUserStatusModalProps } from "./types";

const defaultStatusOptions = [
  { value: "active", option: "Ativo" },
  { value: "vacation", option: "Férias/Afastado" },
  { value: "disabled", option: "Desligado" },
];

export function UpdateUserStatusModal({
  isOpen,
  onClose,
  userName,
  currentStatus,
}: UpdateUserStatusModalProps) {
  const filterStatusOptions = defaultStatusOptions.filter(
    (status) => status.value !== currentStatus
  );

  const { handleSubmit, handleUpdateStatus, isDirty, isSubmitting, register } =
    useUpdateUserStatus(userName, onClose);

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
            {userName}
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
