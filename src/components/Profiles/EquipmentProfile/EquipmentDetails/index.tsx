import { Button, Flex, HStack, List, SimpleGrid } from "@chakra-ui/react";
import { Archive, Pencil, X } from "@phosphor-icons/react";

import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { formatData } from "@/utils/formatData";
import { useEditEquipment } from "./UseEditEquipment";
import { EquipmentDetailsProps } from "./types";

export function EquipmentDetails({ equipment }: EquipmentDetailsProps) {
  const {
    handleCancel,
    handleUpdate,
    handleSubmit,
    register,
    isBlocked,
    isDirty,
    isSubmitting,
    departementList,
  } = useEditEquipment({ equipment });

  console.log(equipment);

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

          <Input
            label="Tipo"
            size="md"
            {...register("type")}
            isReadOnly={isBlocked}
            isDisabled={!isBlocked}
          />

          <Input
            label="Patrimônio"
            size="md"
            {...register("patrimony")}
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

            {departementList?.departments.map((department) => (
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
