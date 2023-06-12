import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { List, SimpleGrid } from "@chakra-ui/react";
import { useCreateEquipment } from "./UseCreateEquipment";

export function CreateNewEquipmentForm() {
  const { handleSubmit, handleCreate, departmentList, register } =
    useCreateEquipment();

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

        <Input label="Tipo" size="md" {...register("type")} />

        <Input label="Patrimônio" size="md" {...register("patrimony")} />

        <Select
          size="md"
          label="Departamento"
          {...register("department_id")}
          placeholder="Selecione o Departamento"
          isRequired
        >
          {departmentList?.departments.map((department) => (
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
          label="Tipo do Armazenamento"
          size="md"
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
          size="md"
        >
          <option value="hd">HD</option>
          <option value="ssd">SSD</option>
        </Select>
      </List>
    </SimpleGrid>
  );
}
