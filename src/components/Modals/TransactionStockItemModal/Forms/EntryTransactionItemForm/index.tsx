import { Stack } from "@chakra-ui/react";

import { Input } from "@/components/Form/input";
import { useEntryTransactionItem } from "./UseEntryTransactionItem";
import { EntryTransactionFormProps } from "./type";

export function EntryTransactionItemForm({ item }: EntryTransactionFormProps) {
  const { register, handleSubmit, handleEntryTransaction } =
    useEntryTransactionItem({ item });

  return (
    <Stack
      onSubmit={handleSubmit(handleEntryTransaction)}
      as="form"
      id="transaction"
      direction="column"
      spacing={2}
    >
      <Input {...register("price")} label="Preço Unitário" />
      <Input {...register("amount")} label="Quantidade" />
      <Input {...register("supplier")} label="Fornecedor" />
      <Input {...register("nf")} label="Nota Fiscal" />
    </Stack>
  );
}
