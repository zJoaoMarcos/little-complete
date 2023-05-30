import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useEquipment } from "@/contexts/Inventory";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { List, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const createEquipmetSchema = z.object({
  id: z.string().nonempty("O id é obrigatório"),
  brand: z.string(),
  model: z.string(),
  supplier: z.string().nullable(),
  invoice: z.string().nullable(),
  warranty: z.string().nullable(),
  department_id: z.coerce.number(),
  purchase_date: z.date().nullable(),
  cpu: z.string().nullable(),
  ram: z.string().nullable(),
  slots: z.coerce.number().nullable(),
  storage0_type: z.string().nullable(),
  storage0_syze: z.coerce.number().nullable(),
  storage1_type: z.string().nullable(),
  storage1_syze: z.coerce.number().nullable(),
  video: z.string().nullable(),
  service_tag: z.string().nullable(),
});

type CreateEquipmentData = z.infer<typeof createEquipmetSchema>;

export function NewEquipmentForm() {
  const { data } = useFetchDepartmentsList({});

  const { register, handleSubmit, formState, reset } =
    useForm<CreateEquipmentData>({
      resolver: zodResolver(createEquipmetSchema),
      defaultValues: {
        purchase_date: null,
        slots: null,
        storage0_syze: null,
        storage1_syze: null,
      },
    });

  const { isDirty, isSubmitting } = formState;

  const { createEquipment } = useEquipment();

  const handleCreate: SubmitHandler<CreateEquipmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await createEquipment.mutateAsync(data);

    reset();
  };

  return (
    <SimpleGrid
      as="form"
      id="create_equipment"
      onSubmit={handleSubmit(handleCreate)}
      columns={{ base: 1, md: 2 }}
      spacing={10}
      marginTop={8}
    >
      <List spacing={6}>
        <Input size="md" {...register("id")} label="ID" isRequired />

        <Select
          size="md"
          label="Departamento"
          {...register("department_id")}
          placeholder="Selecione o Departamento"
          isRequired
        >
          {data?.departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>

        <Input size="md" {...register("brand")} label="Fabricante" isRequired />

        <Input size="md" {...register("model")} label="Modelo" isRequired />

        <Input size="md" {...register("service_tag")} label="Service Tag" />

        <Input size="md" {...register("supplier")} label="Fornecedor" />

        <Input
          size="md"
          {...register("purchase_date")}
          label="Data de Compra"
          type="date"
        />

        <Input size="md" {...register("warranty")} label="Garantia" />

        <Input size="md" {...register("invoice")} label="Nota fiscal" />
      </List>

      <List spacing={6}>
        <Input size="md" {...register("cpu")} label="Processador" />

        <Input size="md" {...register("ram")} label="Memória" />

        <Input size="md" {...register("video")} label="Placa de Video" />

        <Input
          size="md"
          {...register("slots")}
          label="Qtd. de Slots"
          type="number"
        />

        <Input
          size="md"
          {...register("storage0_syze")}
          label="Tamanho de Armazenamento"
          type="number"
        />

        <Select
          {...register("storage0_type")}
          placeholder="Tipo de Armazenamento"
        >
          <option value="hd">HD</option>
          <option value="ssd">SSD</option>
        </Select>

        <Input
          size="md"
          {...register("storage1_syze")}
          label="Tamanho de Armazenamento (2)"
          type="number"
        />

        <Select
          {...register("storage1_type")}
          placeholder="Tipo de Armazenamento"
          label="Tipo de Armazenamento (1)"
        >
          <option value="hd">HD</option>
          <option value="ssd">SSD</option>
        </Select>
      </List>
    </SimpleGrid>
  );
}
