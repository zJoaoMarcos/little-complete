import { VStack } from "@chakra-ui/react";

import { Input } from "@/components/Form/input";
import { useEditItem } from "./hooks/UseEditItem";
import { EditItemFormProps } from "./types";

export function EditItemForm({ item, onClose }: EditItemFormProps) {
  const { register, errors, handleSubmit, handleEditItem } = useEditItem({
    item,
    onClose,
  });

  return (
    <VStack
      spacing="2"
      as="form"
      id="update_item"
      onSubmit={handleSubmit(handleEditItem)}
    >
      <Input {...register("brand")} error={errors.brand} label="Fabricante" />
      <Input {...register("model")} error={errors.model} label="Modelo" />
      <Input {...register("type")} error={errors.type} label="Tipo" />
      <Input
        {...register("category")}
        error={errors.category}
        label="Category"
      />
    </VStack>
  );
}
