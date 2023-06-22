import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { IconButton, SimpleGrid, VStack } from "@chakra-ui/react";
import { Minus, Plus } from "@phosphor-icons/react";
import { useCreateEquipment } from "./UseCreateEquipment";

export function CreateNewEquipmentForm() {
  const {
    handleSubmit,
    handleCreate,
    departmentList,
    register,
    hasExtraStorage,
    setHasExtraStorage,
  } = useCreateEquipment();

  return (
    <SimpleGrid
      as="form"
      id="create_equipment"
      onSubmit={handleSubmit(handleCreate)}
      columns={{ base: 1, md: 2 }}
      spacing={10}
      marginTop={8}
    >
      <VStack spacing={6}>
        <Input size="md" {...register("id")} label="ID" isRequired />
        <Input {...register("type")} label="Tipo" size="md" />
        <Input {...register("patrimony")} label="Patrimônio" size="md" />
        <Select
          {...register("department_id")}
          label="Departamento"
          size="lg"
          placeholder="Selecione o Departamento"
        >
          {departmentList?.departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>
        <Input {...register("brand")} label="Fabricante" size="md" />
        <Input {...register("model")} label="Modelo" size="md" />
        <Input {...register("service_tag")} label="Service Tag" size="md" />
        <Input {...register("supplier")} label="Fornecedor" size="md" />
        <Input
          {...register("purchase_date")}
          size="md"
          label="Data de Compra"
          type="date"
        />
        <Input {...register("warranty")} label="Garantia" size="md" />
        <Input {...register("invoice")} label="Nota fiscal" size="md" />
      </VStack>

      <VStack spacing={6}>
        <Input {...register("cpu")} label="Processador" size="md" />
        <Input {...register("ram")} label="Memória" size="md" />
        <Input {...register("video")} label="Placa de Video" size="md" />
        <Input
          {...register("slots")}
          label="Qtd. de Slots"
          type="number"
          size="md"
        />
        <Input
          {...register("storage0_syze")}
          label="Tamanho de Armazenamento"
          type="number"
          size="md"
        />

        <Select
          {...register("storage0_type")}
          label="Tipo do Armazenamento"
          placeholder="Tipo de Armazenamento"
          size="lg"
        >
          <option value="hd">HD</option>
          <option value="ssd">SSD</option>
        </Select>

        <IconButton
          aria-label="extra-storage"
          borderRadius="full"
          bgColor="purple.200"
          icon={hasExtraStorage ? <Minus /> : <Plus />}
          onClick={() => setHasExtraStorage(!hasExtraStorage)}
        />

        {hasExtraStorage && (
          <>
            <Input
              {...register("storage1_syze")}
              label="Tamanho de Armazenamento (2)"
              type="number"
              size="md"
            />

            <Select
              {...register("storage1_type")}
              placeholder="Tipo de Armazenamento"
              label="Tipo de Armazenamento (2)"
              size="md"
            >
              <option value="hd">HD</option>
              <option value="ssd">SSD</option>
            </Select>
          </>
        )}
      </VStack>
    </SimpleGrid>
  );
}
