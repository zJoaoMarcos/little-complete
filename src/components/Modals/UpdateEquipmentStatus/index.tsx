import { Select } from "@/components/Form/Select";
import { useEquipment } from "@/contexts/Inventory";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const UpdateEquipmentStatusSchema = z.object({
  equipment_id: z.string().nonempty(),
  status: z.string().nonempty(),
});

type UpdateEquipmentStatusData = z.infer<typeof UpdateEquipmentStatusSchema>;

interface UpdateEquipmentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment_id: string;
  currentStatus: string;
}

const defaultStatusOptions = [
  { value: "avaliable", option: "Disponivel" },
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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateEquipmentStatusData>({
    resolver: zodResolver(UpdateEquipmentStatusSchema),
    defaultValues: { equipment_id: equipment_id },
  });

  const { updateEquipmentStatus } = useEquipment();

  const handleUpdateStatus: SubmitHandler<UpdateEquipmentStatusData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateEquipmentStatus.mutateAsync(data);

    onClose();
  };

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
