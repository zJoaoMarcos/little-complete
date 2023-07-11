import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { VStack } from "@chakra-ui/react";
import { useRegisterNewItem } from "./hooks/useRegisterNewItem";

export function RegisterNewItemForm({ onClose }: { onClose: () => void }) {
  const { handleRegister, handleSubmit, register, categories, errors } =
    useRegisterNewItem(onClose);

  return (
    <VStack
      as="form"
      id="new-item"
      onSubmit={handleSubmit(handleRegister)}
      align="start"
    >
      <Input {...register("type")} label="Tipo" error={errors.type} />

      <Input {...register("model")} label="Modelo" error={errors.model} />

      <Select
        {...register("category")}
        label="Categoria"
        placeholder="Selecione a categoria"
        error={errors.category}
      >
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.value}>
              {category.name}
            </option>
          );
        })}
      </Select>

      <Input
        {...register("amountMin")}
        label="Quantidade min"
        error={errors.amountMin}
      />
    </VStack>
  );
}
