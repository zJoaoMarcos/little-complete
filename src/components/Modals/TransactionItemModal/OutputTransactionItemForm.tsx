import { Stack } from "@chakra-ui/react";

import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useOutpuTransactionItem } from "./hooks/useOutputTransactionItem";

interface Props {
  itemId: string;
  onClose: () => void;
}

export function OutputTransactionForm({ itemId, onClose }: Props) {
  const { handleSubmit, handleOutputTransactionItem, register, usersList } =
    useOutpuTransactionItem(itemId, onClose);

  return (
    <Stack
      as="form"
      id="transaction"
      onSubmit={handleSubmit(handleOutputTransactionItem)}
      direction="column"
    >
      <Input {...register("amount")} label="Quantidade" placeholder="Ex: 8" />

      <Select
        {...register("requester")}
        label="Requisitante"
        placeholder="Selecione o requisitante"
      >
        <>
          {usersList?.users.map((user) => (
            <option key={user.user_name} value={user.user_name}>
              {user.user_name}
            </option>
          ))}
        </>
      </Select>
    </Stack>
  );
}
