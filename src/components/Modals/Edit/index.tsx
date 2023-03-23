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
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  amount: number;
  amount_min: number;
  local: string;
}

type UpdateItemData = {
  id: string;
  name: string;
  description: string;
  type: string;
  amount: number;
  amount_min: number;
  local: string;
};

const updateItemFormSchema = yup.object().shape({
  name: yup.string().required("O campo é obrigatório"),
  description: yup.string().required("O campo é obrigatório"),
  type: yup.string().required("O campo é obrigatório"),
  amount_min: yup
    .number()
    .integer("O número deve ser inteiro")
    .positive("O número deve ser positivo")
    .min(0, "O número deve ser maior o igual a zero")
    .required(),
  local: yup.string().required("O campo é obrigatório"),
});

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

export function EditModal({ isOpen, onClose, item }: EditModalProps) {
  const { register, handleSubmit, formState } = useForm<UpdateItemData>({
    resolver: yupResolver(updateItemFormSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      description: item.description,
      type: item.type,
      amount: item.amount,
      amount_min: item.amount_min,
      local: item.local,
    },
  });

  const { errors, isSubmitting, isDirty } = formState;

  const { updateItem } = useStock();

  const handleUpdateItem: SubmitHandler<UpdateItemData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateItem.mutateAsync(data);

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
          Editar <Text textColor="pink.500">{item.name}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            onSubmit={handleSubmit(handleUpdateItem)}
            id="update_item"
          >
            <Stack spacing="4">
              <Input {...register("name")} error={errors.name} label="Item" />

              <Input
                {...register("description")}
                error={errors.description}
                label="Descrição"
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
            form="update_item"
            type="submit"
            colorScheme="pink"
            isDisabled={!isDirty}
            isLoading={isSubmitting}
          >
            Alterar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
