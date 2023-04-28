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

type UpdateEquipmentData = {
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

interface Equipment {
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
}

interface UpdateEquipmentProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment;
}

export function UpdateEquipmentModal({
  isOpen,
  onClose,
  equipment,
}: UpdateEquipmentProps) {
  const { register, handleSubmit, formState, reset } =
    useForm<UpdateEquipmentData>({
      defaultValues: {
        id: equipment.id,
        brand: equipment.brand,
        model: equipment.model,
        supplier: equipment.supplier,
        invoice: equipment.invoice,
        warranty: equipment.warranty,
        purchase_date: equipment.purchase_date,
        department: equipment.department,
        status: equipment.status,
        cpu: equipment.cpu,
        ram: equipment.ram,
        slots: equipment.slots,
        storage0_type: equipment.storage0_type,
        storage0_syze: equipment.storage0_syze,
        storage1_type: equipment.storage1_type,
        storage1_syze: equipment.storage1_syze,
        video: equipment.video,
        service_tag: equipment.service_tag,
      },
    });
  const { errors, isSubmitting } = formState;

  const { createEquipment } = useEquipment();

  const handleEditEquipment: SubmitHandler<UpdateEquipmentData> = async (
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
          {equipment.id}
          <Text textColor="pink.500">Editar Equipamento</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            id="update_equipment"
            onSubmit={handleSubmit(handleEditEquipment)}
          >
            <Stack spacing="4">
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
            form="update_equipment"
            type="submit"
            colorScheme="purple"
            isLoading={isSubmitting}
          >
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
