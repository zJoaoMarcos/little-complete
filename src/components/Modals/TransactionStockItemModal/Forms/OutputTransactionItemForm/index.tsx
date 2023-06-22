import { Stack } from "@chakra-ui/react";

import { Input } from "@/components/Form/input";
import { useOutpuTransactionItem } from "./UseOutputTransactionItem";
import { OutputTransactionFormProps } from "./types";

export function OutputTransactionForm({ item }: OutputTransactionFormProps) {
  const { handleSubmit, handleOutputTransactionItem, register } =
    useOutpuTransactionItem(item.id);

  return (
    <Stack
      as="form"
      id="transaction"
      onSubmit={handleSubmit(handleOutputTransactionItem)}
      direction="column"
    >
      <Input {...register("amount")} label="Quantidade" />
      <Input {...register("requester")} label="Requisitante" />
    </Stack>
  );
}
