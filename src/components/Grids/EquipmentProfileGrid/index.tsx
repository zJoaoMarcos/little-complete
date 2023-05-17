import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useEquipment } from "@/contexts/EquipmetContext";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { List, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const updateEquipmentSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  supplier: z.string().nullable(),
  invoice: z.string().nullable(),
  warranty: z.string().nullable(),
  purchase_date: z.date().nullable(),
  department_id: z.coerce.number(),
  status: z.string(),
  cpu: z.string().nullable(),
  ram: z.string().nullable(),
  slots: z.coerce.number(),
  storage0_type: z.string().nullable(),
  storage0_syze: z.coerce.number(),
  storage1_type: z.string().nullable(),
  storage1_syze: z.coerce.number(),
  video: z.string().nullable(),
  service_tag: z.string().nullable(),
});

type UpdateEquipmentData = z.infer<typeof updateEquipmentSchema>;

interface EquipmentProfileGridProps {
  equipment: {
    id: string;
    brand: string;
    model: string;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: Date | null;
    department: { id: number; name: string };
    status: string;
    cpu: string | null;
    ram: string | null;
    slots: number;
    storage0_type: string | null;
    storage0_syze: number;
    storage1_type: string | null;
    storage1_syze: number;
    video: string | null;
    service_tag: string | null;
  };
}

export function EquipmentProfileGrid({ equipment }: EquipmentProfileGridProps) {
  const [isBlocked, setIsBlocked] = useState(true);
  const { data } = useFetchDepartmentsList();

  const { register, handleSubmit, formState, reset } =
    useForm<UpdateEquipmentData>({
      resolver: zodResolver(updateEquipmentSchema),
      defaultValues: {
        id: equipment.id,
        brand: equipment.brand,
        model: equipment.model,
        supplier: equipment.supplier,
        invoice: equipment.invoice,
        warranty: equipment.warranty,
        department_id: equipment.department.id,
        purchase_date: equipment.purchase_date,
        cpu: equipment.cpu,
        ram: equipment.ram,
        slots: equipment.slots,
        service_tag: equipment.service_tag,
        storage0_type: equipment.storage0_type,
        storage0_syze: equipment.storage0_syze,
        storage1_type: equipment.storage1_type,
        storage1_syze: equipment.storage1_syze,
        video: equipment.video,
      },
    });

  const { updateEquipment } = useEquipment();

  const handleUpdate: SubmitHandler<UpdateEquipmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateEquipment.mutateAsync(data);

    setIsBlocked(isBlocked);
  };

  return (
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
          {data?.departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
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
  );
}
