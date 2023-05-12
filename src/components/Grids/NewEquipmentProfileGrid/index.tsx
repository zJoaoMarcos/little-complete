import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useEquipment } from "@/contexts/EquipmetContext";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { List, SimpleGrid } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateEquipmentData = {
  id: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department_id: number;
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

export function NewEquipmentProfileGrid() {
  const { data } = useFetchDepartmentsList();

  const { register, handleSubmit, formState, reset } =
    useForm<CreateEquipmentData>({
      defaultValues: {
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
    event.preventDefault();

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
          defaultValue={null}
        />

        <Input
          size="md"
          {...register("storage0_syze")}
          label="Tamanho de Armazenamento"
          type="number"
          defaultValue={null}
        />

        <Input
          size="md"
          {...register("storage0_type")}
          label="Tipo de Armazenamento"
          type="text"
        />

        <Input
          size="md"
          {...register("storage1_syze")}
          label="Tamanho de Armazenamento (2)"
          type="number"
          defaultValue={null}
        />

        <Input
          size="md"
          {...register("storage1_type")}
          label="Tipo de Armazenamento (2)"
          type="text"
        />
      </List>
    </SimpleGrid>
  );
}
