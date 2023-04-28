import { Input } from "@/components/Form/input";
import { useEquipment } from "@/contexts/EquipmetContext";
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

type CreateEquipmentData = {
  id: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: string | null;
  department: string;
  status: string;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;
};

interface CreateEquipmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateEquipmentModal({
  isOpen,
  onClose,
}: CreateEquipmentProps) {
  const { register, handleSubmit, formState, reset } =
    useForm<CreateEquipmentData>();
  const { errors, isSubmitting } = formState;

  const { createEquipment } = useEquipment();

  const handleCreateEquipment: SubmitHandler<CreateEquipmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await createEquipment.mutateAsync(data);

    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      size="xl"
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
            id="create_equipment"
            onSubmit={handleSubmit(handleCreateEquipment)}
          >
            <Stack spacing="4">
              <Input
                {...register("id")}
                error={errors.id}
                label="Id do Equipamento"
                type="text"
              />

              <Input
                {...register("status")}
                error={errors.status}
                label="Status"
                type="text"
              />

              <Input
                {...register("department")}
                error={errors.department}
                label="Departamento"
                type="text"
              />
              <Input
                {...register("brand")}
                error={errors.brand}
                label="Fabricante"
                type="text"
              />

              <Input
                {...register("model")}
                error={errors.model}
                label="Modelo"
              />

              <Input
                {...register("cpu")}
                error={errors.cpu}
                label="Processador"
                type="text"
              />

              <Input
                {...register("ram")}
                error={errors.ram}
                label="Memória RAM"
                type="text"
              />

              <Input
                {...register("storage0_syze")}
                error={errors.storage0_syze}
                label="Tamanho de Armazenamento (1)"
                type="Number"
              />

              <Input
                {...register("storage0_type")}
                error={errors.storage0_type}
                label="Tipo de Armazenamento (1)"
                type="text"
              />

              <Input
                {...register("storage1_syze")}
                error={errors.storage1_syze}
                label="Tamanho de Armazenamento (2)"
                type="Number"
              />

              <Input
                {...register("storage1_type")}
                error={errors.storage1_type}
                label="Tipo de Armazenamento (2)"
                type="text"
              />

              <Input
                {...register("service_tag")}
                error={errors.service_tag}
                label="Service Tag"
                type="text"
              />

              <Input
                {...register("supplier")}
                error={errors.supplier}
                label="Fornecedor"
                type="text"
              />

              <Input
                {...register("invoice")}
                error={errors.invoice}
                label="Nota Fiscal"
                type="text"
              />

              <Input
                {...register("warranty")}
                error={errors.warranty}
                label="Garantia"
                type="text"
              />
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            form="create_equipment"
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
