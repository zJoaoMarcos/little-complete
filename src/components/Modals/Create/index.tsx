import { Input } from "@/components/Form/input";
import { Select } from "@/components/Form/Select";
import { useStock } from "@/contexts/StockContext";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type CreateItemData = {
  name: string;
  description: string;
  type: string;
  amount_min: number;
  local: string;
};

const createItemFormSchema = yup.object().shape({
  name: yup.string().required("O campo é obrigatório"),
  description: yup.string(),
  type: yup.string().required("O campo é obrigatório"),
  amount_min: yup
    .number()
    .integer("O número deve ser inteiro")
    .positive("O número deve ser positivo")
    .min(0, "O número deve ser maior o igual a zero")
    .required(),
  local: yup.string().required("O campo é obrigatório"),
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateModal({ isOpen, onClose }: ModalProps) {
  const { register, handleSubmit, formState, reset } = useForm<CreateItemData>({
    resolver: yupResolver(createItemFormSchema),
    defaultValues: {
      amount_min: 0,
    },
  });

  const { errors, isSubmitting } = formState;

  const { createItem } = useStock();

  const handleCreateItem: SubmitHandler<CreateItemData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await createItem.mutateAsync(data);

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
        <ModalHeader>Novo Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            onSubmit={handleSubmit(handleCreateItem)}
            id="create_item"
          >
            <Stack spacing="4">
              <Input
                {...register("name")}
                error={errors.name}
                label="Item"
                placeholder="Nome"
              />

              <Input
                {...register("description")}
                error={errors.description}
                label="Descrição"
                placeholder="Marca, modelo, especifações e etc... "
              />

              <Select
                {...register("type")}
                error={errors.type}
                label="Tipo"
                placeholder="Hardware, Periféricos, etc..."
              >
                <option value="Hardware">Hardware</option>
                <option value="Peripheral">Periférico</option>
                <option value="Extension">Ramal</option>
              </Select>

              <Input
                {...register("amount_min")}
                error={errors.amount_min}
                label="Quantidade Mínima"
                type="number"
              />

              <Select
                {...register("local")}
                error={errors.local}
                label="Local"
                placeholder="Selecione o local"
              >
                <option value="8° Andar">8° Andar</option>
                <option value="-1° Andar">- 1° Andar</option>
              </Select>
            </Stack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            form="create_item"
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
