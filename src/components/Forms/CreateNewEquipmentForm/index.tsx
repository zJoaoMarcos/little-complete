import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { IconButton, SimpleGrid, VStack } from "@chakra-ui/react";
import { Minus, Plus } from "@phosphor-icons/react";
import { useCreateEquipment } from "./hooks/useCreateEquipment";

export function CreateNewEquipmentForm() {
  const {
    handleSubmit,
    handleCreate,
    departmentList,
    register,
    hasExtraStorage,
    setHasExtraStorage,
    typesOfEquipments,
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
        <Select
          {...register("type")}
          label="Tipo"
          placeholder="Selecione o Tipo"
        >
          {typesOfEquipments.map((type) => (
            <option key={type.value} value={type.value}>
              {type.option}
            </option>
          ))}
        </Select>
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
        <Input {...register("serviceTag")} label="Service Tag" size="md" />
        <Input {...register("supplier")} label="Fornecedor" size="md" />
        <Input
          {...register("purchaseDate")}
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
          {...register("storage0Syze")}
          label="Tamanho de Armazenamento"
          type="number"
          size="md"
        />

        <Select
          {...register("storage0Type")}
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
              {...register("storage1Syze")}
              label="Tamanho de Armazenamento (2)"
              type="number"
              size="md"
            />

            <Select
              {...register("storage1Type")}
              label="Tipo de Armazenamento (2)"
              placeholder="Tipo de Armazenamento"
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
