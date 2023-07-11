import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { Checkbox, VStack } from "@chakra-ui/react";
import { useRegisterNewItem } from "./hooks/useRegisterNewItem";

export function NewItemForm({ onClose }: { onClose: () => void }) {
  const { handleRegister, handleSubmit, register, isNewType } =
    useRegisterNewItem(onClose);

  return (
    <VStack
      as="form"
      id="new-item"
      onSubmit={handleSubmit(handleRegister)}
      align="start"
    >
      <Input {...register("brand")} label="Marca" />
      <Input {...register("model")} label="Modelo" />
      <Checkbox size="lg" {...register("isNewTypeGroup")} colorScheme="purple">
        É um novo Grupo de Tipo ?
      </Checkbox>

      <Select
        {...register("category")}
        label="Categoria"
        placeholder="Selecione a categoria"
      >
        <option value="peripherals">Periférico</option>
        <option value="hardware">Hardware</option>
      </Select>
    </VStack>
  );
}
