import { Stack } from "@chakra-ui/react";

import { Input } from "@/components/Form/input";
import { useEntryTransaction } from "./hooks/useEntryTransaction";

interface Props {
  itemId: string;
  onClose: () => void;
}

export function EntryTransactionItemForm({ itemId, onClose }: Props) {
  const { register, handleEntryTransaction, handleSubmit } =
    useEntryTransaction(itemId, onClose);

  return (
    <Stack
      as="form"
      id="transaction"
      onSubmit={handleSubmit(handleEntryTransaction)}
      direction="column"
    >
      <Input {...register("price")} label="Preço" />
      <Input {...register("amount")} label="Quantidade" />
      <Input {...register("invoice")} label="Nota Fiscal" />
      <Input {...register("supplier")} label="Fornecedor" />
    </Stack>
  );
}
