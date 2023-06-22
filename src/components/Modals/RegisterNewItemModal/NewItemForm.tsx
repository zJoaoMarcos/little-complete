import { Input } from "@/components/Form/input";
import { VStack } from "@chakra-ui/react";
import { useRegisterNewItem } from "./hooks/useRegisterNewItem";

export function NewItemForm() {
  const { handleRegister, handleSubmit, register } = useRegisterNewItem();

  return (
    <VStack as="form" onSubmit={handleSubmit(handleRegister)}>
      <Input {...register("brand")} label="Marca" />
      <Input {...register("model")} label="Modelo" />
      <Input {...register("type")} label="Tipo" />
      <Input {...register("category")} label="Categoria" />
    </VStack>
  );
}
