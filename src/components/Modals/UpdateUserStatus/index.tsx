import { Select } from "@/components/Form/Select";
import { useUser } from "@/contexts/UserContext";
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

const UpdateUserStatusSchema = z.object({
  user_name: z.string().nonempty(),
  status: z.string().nonempty(),
});

type UpdateUserStatusData = z.infer<typeof UpdateUserStatusSchema>;

interface UpdateUserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  currentStatus: string;
}

type IStatusOptions = {
  value: string;
  option: string;
};

const defaultStatusOptions: IStatusOptions[] = [
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
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateUserStatusData>({
    resolver: zodResolver(UpdateUserStatusSchema),
    defaultValues: { user_name: userName, status: currentStatus },
  });

  const { updateStatus } = useUser();
  const handleUpdateStatus: SubmitHandler<UpdateUserStatusData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateStatus.mutateAsync(data);

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
            {userName}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as="form"
          id="update_status"
          onSubmit={handleSubmit(handleUpdateStatus)}
        >
          <Select {...register("status")}>
            {defaultStatusOptions.map((status, i) => {
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
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
