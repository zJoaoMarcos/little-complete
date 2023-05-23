import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useEquipment } from "@/contexts/EquipmetContext";
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

interface EquipmentProfileGridProps {
  equipment: {
    id: string;
    type: string;
    brand: string | null;
    model: string | null;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: Date | null;
    department: {
      id: number | null;
      name: string | null;
    };
    status: string | null;
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
}

export function EquipmentProfileGrid({ equipment }: EquipmentProfileGridProps) {
  const [isBlocked, setIsBlocked] = useState(true);

  const { data } = useFetchDepartmentsList();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<UpdateEquipmentData>({
    resolver: zodResolver(updateEquipmentSchema),
    defaultValues: {
      id: equipment.id,
      brand: equipment.brand ? equipment.brand : undefined,
      model: equipment.model ? equipment.model : undefined,
      supplier: equipment.supplier,
      invoice: equipment.invoice,
      warranty: equipment.warranty,
      purchase_date: equipment.purchase_date,
      cpu: equipment.cpu,
      ram: equipment.ram,
      slots: equipment.slots ?? undefined,
      service_tag: equipment.service_tag,
      storage0_type: equipment.storage0_type,
      storage0_syze: equipment.storage0_syze,
      storage1_type: equipment.storage1_type ?? undefined,
      storage1_syze: equipment.storage1_syze ?? undefined,
      video: equipment.video,
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

  return (
    <Flex flexDir="column">
      <HStack ml="auto">
        <Button
          onClick={() => setIsBlocked(!isBlocked)}
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
