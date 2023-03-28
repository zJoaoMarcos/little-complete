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

type MovementItemData = {
  id: string;
  type: string;
  partner: string;
  department: string;
  amount: number;
  value: string;
};

const movementItemFormSchema = yup.object().shape({
  type: yup.string().required("O campo Tipo é obrigatório"),
  partner: yup.string().required("o campo é obrigatório"),
  department: yup.string().required("o campo é obrigatório"),
  amount: yup
    .number()
    .integer()
    .positive()
    .moreThan(0, "O número deve ser maior igual a 1"),
  value: yup
    .string()
    .transform((value, originalValue) => originalValue.replace(",", "."))
    .test("is-number", "Invalid price", (value) => !isNaN(parseFloat(value!)))
    .test(
      "is-positive",
      "Price must be positive",
      (value) => parseFloat(value!) >= 0
    )
    .min(0, "Preço precisa ser maior ou igual a 0."),
});

interface MovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export function MovementModal({ isOpen, onClose, id }: MovementModalProps) {
  const { register, handleSubmit, formState, reset, watch, setValue } =
    useForm<MovementItemData>({
      resolver: yupResolver(movementItemFormSchema),
      defaultValues: {
        id: id,
      },
    });
  const { errors, isSubmitting } = formState;
  const type = watch("type");

  if (type === "output") {
    setValue("value", "0,00");
  }

  const { movementItem } = useStock();

  const handleMovementItem: SubmitHandler<MovementItemData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await movementItem.mutateAsync(data);

    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Movimentação <Text textColor="pink.500">SSD 240Gb Kingston </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box
            as="form"
            onSubmit={handleSubmit(handleMovementItem)}
            id="movement_item"
          >
            <Stack>
              <Select
                {...register("type")}
                label="Tipo"
                placeholder="Entrada ou Saida?"
                error={errors.type}
              >
                <option value="input">Entrada</option>
                <option value="output">Saída</option>
              </Select>

              <Input
                {...register("partner")}
                label="Requisitante"
                error={errors.partner}
                type="text"
                placeholder="Solicitante/Fornecedor"
              />

              <Select
                {...register("department")}
                error={errors.department}
                label="Departamento"
                placeholder="Selecione o Departamento"
              >
                <option value="ti">Tecnologia da Informação</option>
                <option value="aprovacoes">Aprovações</option>
              </Select>

              <Input
                {...register("amount")}
                error={errors.amount}
                label="Quantidade"
                type="number"
                placeholder="0"
              />

              <Input
                {...register("value")}
                error={errors.value}
                placeholder="R$ 99,99"
                label="Valor"
                isDisabled={type === "output"}
              />
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            form="movement_item"
            colorScheme="purple"
            isLoading={isSubmitting}
          >
            Movimentar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
