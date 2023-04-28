import { Select } from "@/components/Form/Select";
import { useUser } from "@/contexts/UserContext";
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
import { SubmitHandler, useForm } from "react-hook-form";

type ChangeStatusData = {
  user_name: string;
  status: string;
};

interface ChangeStatusProps {
  userName: string;
  currentStatus: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ChangeStatusModal({
  isOpen,
  onClose,
  userName,
  currentStatus,
}: ChangeStatusProps) {
  const { register, handleSubmit, formState, reset } =
    useForm<ChangeStatusData>({
      defaultValues: {
        user_name: userName,
        status: currentStatus,
      },
    });
  const { errors, isSubmitting } = formState;

  const { changeStatus } = useUser();

  const handleChangeStatus: SubmitHandler<ChangeStatusData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await changeStatus.mutateAsync(data);

    onClose();
    reset();
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
          Alterar Status<Text textColor="pink.500">{userName}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            id="change_status"
            onSubmit={handleSubmit(handleChangeStatus)}
          >
            <Stack spacing="4">
              <Select
                {...register("status")}
                error={errors.status}
                label="Status"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </Select>
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button form="change_status" type="submit" colorScheme="purple">
            Alterar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
