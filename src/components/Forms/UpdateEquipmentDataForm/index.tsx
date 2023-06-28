import {
  Button,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { Archive, Minus, Pencil, Plus, X } from "@phosphor-icons/react";

import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { formatData } from "@/utils/formatData";
import { useEditEquipment } from "./hooks/useEditEquipment";
import { UdpateEquipmentDataFormProps } from "./types";

export function UdpateEquipmentDataForm({
  equipment,
}: UdpateEquipmentDataFormProps) {
  const {
    handleCancel,
    handleUpdate,
    handleSubmit,
    register,
    isBlocked,
    isDirty,
    isSubmitting,
    departmentList,
    hasExtraStorage,
    setHasExtraStorage,
  } = useEditEquipment({ equipment });

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
        <VStack spacing={6}>
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
            {...register("departmentId")}
            isDisabled={isBlocked}
          >
            {equipment.department.id && (
              <option value={equipment.department.id}>
                {equipment.department.name}
              </option>
            )}

            {departmentList?.departments.map((department) => (
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
            {...register("serviceTag")}
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
            {...register("purchaseDate")}
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
        </VStack>

        <VStack spacing={6}>
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
            {...register("storage0Type")}
            label="Tipo de Armazenamento"
            isReadOnly={isBlocked}
            type="text"
          />

          <Input
            size="md"
            {...register("storage0Syze")}
            label="Tamanho de Armazenamento"
            isReadOnly={isBlocked}
            type="number"
          />

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
    </Flex>
  );
}
