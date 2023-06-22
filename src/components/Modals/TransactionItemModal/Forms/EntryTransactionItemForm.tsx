import { Stack } from "@chakra-ui/react";

import { Input } from "@/components/Form/input";
import { useEntryTransactionItem } from "../hooks/UseEntryTransactionItem";

interface Props {
  itemId: string;
}

export function EntryTransactionItemForm({ itemId }: Props) {
  const { register, handleEntryTransaction, handleSubmit } =
    useEntryTransactionItem(itemId);

  return (
    <Stack
      as="form"
      id="transaction"
      onSubmit={handleSubmit(handleEntryTransaction)}
      direction="column"
    >
      <Input {...register("price")} label="Preço" />
      <Input {...register("amount")} label="Quantidade" />
      <Input {...register("nf")} label="Nota Fiscal" />
      <Input {...register("supplier")} label="Fornecedor" />
    </Stack>
  );
}
