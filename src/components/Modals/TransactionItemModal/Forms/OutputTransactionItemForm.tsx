import { Stack } from "@chakra-ui/react";

import { Input } from "@/components/Form/input";
import { useOutpuTransactionItem } from "../hooks/UseOutputTransactionItem";

interface Props {
  itemId: string;
}

export function OutputTransactionForm({ itemId }: Props) {
  const { handleSubmit, handleOutputTransactionItem, register } =
    useOutpuTransactionItem(itemId);

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
