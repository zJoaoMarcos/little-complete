import { Input } from "@/components/Form/input";
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

type CreateUserData = {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: string;
  telephone: number;
  direct_boss: string;
  smtp: string;
  admission_date: Date;
  status: string;
};

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const { register, handleSubmit, formState, reset } =
    useForm<CreateUserData>();
  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<CreateUserData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    console.log(data);
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
          <Text textColor="pink.500">Novo Usuário</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            id="create_user"
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Stack spacing="4">
              <Input
                {...register("user_name")}
                error={errors.user_name}
                label="User Name"
              />

              <Input
                {...register("complete_name")}
                error={errors.complete_name}
                label="Nome Completo"
              />

              <Input
                {...register("title")}
                error={errors.title}
                label="Cargo"
              />

              <Input
                {...register("telephone")}
                error={errors.telephone}
                label="Ramal"
              />

              <Input
                {...register("direct_boss")}
                error={errors.direct_boss}
                label="Chefia Imediata"
              />

              <Input {...register("smtp")} error={errors.smtp} label="E-mail" />

              <Input
                {...register("admission_date")}
                error={errors.admission_date}
                label="Data de Admissão"
              />
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            form="create_user"
            type="submit"
            colorScheme="purple"
            isLoading={isSubmitting}
          >
            Criar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
