import { Input } from "@/components/Form/input";
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

type ChangeDepartmentData = {
  user_name: string;
  department_id: string;
  title: string;
  direct_boss: string;
};

interface ChangeDepartmentProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  departmentId: string;
  title: string;
  directBoss: string;
}

export function ChangeDepartmentModal({
  isOpen,
  onClose,
  userName,
  departmentId,
  title,
  directBoss,
}: ChangeDepartmentProps) {
  const { register, handleSubmit, formState } = useForm<ChangeDepartmentData>({
    defaultValues: {
      user_name: userName,
      department_id: departmentId,
      title: title,
      direct_boss: directBoss,
    },
  });
  const { errors, isSubmitting } = formState;

  const { changeDepartment } = useUser();

  const handleChangeStatus: SubmitHandler<ChangeDepartmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await changeDepartment.mutateAsync(data);

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
          Alterar Cargo <Text textColor="pink.500"></Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            id="change_department"
            onSubmit={handleSubmit(handleChangeStatus)}
          >
            <Stack spacing="4">
              <Input
                {...register("title")}
                error={errors.title}
                label="Cargo"
                type="text"
              />

              <Input
                {...register("department_id")}
                error={errors.department_id}
                label="Departmento"
                type="text"
              />

              <Input
                {...register("direct_boss")}
                error={errors.direct_boss}
                label="Chefia Imediata"
              />
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button form="change_department" type="submit" colorScheme="purple">
            Alterar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
