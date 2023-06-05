import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useEquipment } from "@/contexts/Inventory";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { formatData } from "@/utils/formatData";
import { Button, Flex, HStack, List, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Archive, Pencil, X } from "@phosphor-icons/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const updateEquipmentSchema = z.object({
  id: z.string(),
  brand: z.nullable(z.string()),
  model: z.nullable(z.string()),
  supplier: z.nullable(z.string()),
  invoice: z.nullable(z.string()),
  warranty: z.nullable(z.string()),
  purchase_date: z.nullable(z.coerce.date()),
  cpu: z.nullable(z.string()),
  ram: z.nullable(z.string()),
  video: z.nullable(z.string()),
  slots: z.nullable(z.coerce.number()),
  storage0_type: z.nullable(z.string()),
  storage0_syze: z.nullable(z.coerce.number()),
  storage1_type: z.nullable(z.string()),
  storage1_syze: z.nullable(z.coerce.number()),
  service_tag: z.nullable(z.string()),
  department_id: z.coerce.number(),
});

type UpdateEquipmentData = z.infer<typeof updateEquipmentSchema>;

interface EquipmentDetailsProps {
  equipment: {
    id: string;
    status: string;
    currentUser: string | null;
    patrimony: string | null;
    type: string | null;
    brand: string | null;
    model: string | null;
    serviceTag: string | null;
    purchase: {
      invoice: string | null;
      supplier: string | null;
      purchaseDate: Date | null;
      warranty: string | null;
    };
    department: {
      id: number | null;
      name: string | null;
    };
    config: {
      cpu: string | null;
      ram: string | null;
      video: string | null;
      storage: {
        slots: number | null;
        storage0Type: string | null;
        storage0Syze: number | null;
        storage1Type: string | null;
        storage1Syze: number | null;
      };
    };
  };
}

export function EquipmentDetails({ equipment }: EquipmentDetailsProps) {
  const [isBlocked, setIsBlocked] = useState(true);

  const { data } = useFetchDepartmentsList({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateEquipmentData>({
    resolver: zodResolver(updateEquipmentSchema),
    defaultValues: {
      id: equipment.id,
      brand: equipment.brand ? equipment.brand : undefined,
      model: equipment.model ? equipment.model : undefined,
      supplier: equipment.purchase.supplier,
      invoice: equipment.purchase.invoice,
      warranty: equipment.purchase.warranty,
      purchase_date: equipment.purchase.purchaseDate,
      cpu: equipment.config.cpu,
      ram: equipment.config.ram,
      slots: equipment.config.storage.slots ?? undefined,
      service_tag: equipment.serviceTag,
      storage0_type: equipment.config.storage.storage0Type,
      storage0_syze: equipment.config.storage.storage0Syze,
      storage1_type: equipment.config.storage.storage1Type ?? undefined,
      storage1_syze: equipment.config.storage.storage1Syze ?? undefined,
      video: equipment.config.video,
      department_id: equipment.department.id ?? undefined,
    },
  });

  const { updateEquipment } = useEquipment();

  const handleUpdate: SubmitHandler<UpdateEquipmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateEquipment.mutateAsync({ ...data });

    setIsBlocked(true);
  };

  const handleCancel = () => {
    setIsBlocked(!isBlocked);
    reset();
  };

  return (
    <Flex flexDir="column" mt="4">
      <HStack ml="auto">
        <Button
          onClick={handleCancel}
          leftIcon={isBlocked ? <Pencil /> : <X />}
          colorScheme={isBlocked ? "purple" : "red"}
        >
          {isBlocked ? "Editar" : "Cancelar"}
        </Button>

        <Button
          hidden={isBlocked}
          form="update_equipment"
          mr="auto"
          type="submit"
          size="md"
          colorScheme="purple"
          leftIcon={<Archive />}
          isLoading={isSubmitting}
          isDisabled={!isDirty}
        >
          Enviar
        </Button>
      </HStack>
      <SimpleGrid
        as="form"
        id="update_equipment"
        onSubmit={handleSubmit(handleUpdate)}
        columns={{ base: 1, md: 2 }}
        spacing={10}
        marginTop={8}
      >
        <List spacing={6}>
          <Input
            size="md"
            {...register("id")}
            label="ID"
            isReadOnly={isBlocked}
            isDisabled={!isBlocked}
          />

          <Select
            size="md"
            label="Departamento"
            {...register("department_id")}
            isDisabled={isBlocked}
          >
            {equipment.department.id && (
              <option value={equipment.department.id}>
                {equipment.department.name}
              </option>
            )}
            {data?.departments.map((department) => (
              <option key={department.id} value={department.id}>
                {formatData(department.name)}
              </option>
            ))}
          </Select>

          <Input
            size="md"
            {...register("brand")}
            label="Fabricante"
            isReadOnly={isBlocked}
          />

          <Input
            size="md"
            {...register("model")}
            label="Modelo"
            isReadOnly={isBlocked}
          />

          <Input
            size="md"
            {...register("service_tag")}
            label="Service Tag"
            isReadOnly={isBlocked}
          />

          <Input
            size="md"
            {...register("supplier")}
            label="Fornecedor"
            isReadOnly={isBlocked}
          />

          <Input
            size="md"
            {...register("purchase_date")}
            label="Data de Compra"
            isReadOnly={isBlocked}
            type="date"
          />

          <Input
            size="md"
            {...register("warranty")}
            label="Garantia"
            isReadOnly={isBlocked}
          />

          <Input
            size="md"
            {...register("invoice")}
            label="Nota fiscal"
            isReadOnly={isBlocked}
          />
        </List>

        <List spacing={6}>
          <Input
            size="md"
            {...register("cpu")}
            label="Processador"
            isReadOnly={isBlocked}
          />

          <Input
            size="md"
            {...register("ram")}
            label="Memória"
            isReadOnly={isBlocked}
          />

          <Input
            size="md"
            {...register("video")}
            label="Placa de Video"
            isReadOnly={isBlocked}
          />

          <Input
            size="md"
            {...register("slots")}
            label="Qtd. de Slots"
            isReadOnly={isBlocked}
            type="number"
          />

          <Input
            size="md"
            {...register("storage0_type")}
            label="Tipo de Armazenamento"
            isReadOnly={isBlocked}
            type="text"
          />

          <Input
            size="md"
            {...register("storage0_syze")}
            label="Tamanho de Armazenamento"
            isReadOnly={isBlocked}
            type="number"
          />

          <Input
            size="md"
            {...register("storage1_type")}
            label="Tipo de Armazenamento (2)"
            isReadOnly={isBlocked}
            type="text"
          />

          <Input
            size="md"
            {...register("storage1_syze")}
            label="Tamanho de Armazenamento (2)"
            isReadOnly={isBlocked}
            type="number"
          />
        </List>
      </SimpleGrid>
    </Flex>
  );
}
