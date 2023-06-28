import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { EntryTransactionItemSchema } from "./schema";
import { EntryTransactionItemData } from "./types";

export const useEntryTransaction = (itemId: string, onClose: () => void) => {
  const { register, handleSubmit } = useForm<EntryTransactionItemData>({
    resolver: zodResolver(EntryTransactionItemSchema),
    defaultValues: {
      id: itemId,
    },
  });

  const { data: session } = useSession();

  const entryTransactionItem = useMutation(
    async (data: EntryTransactionItemData) => {
      await api.post(`stock/items/${data.id}/transaction/entry`, {
        createdBy: session?.user?.email,
        ...data,
      });
    },
    {
      onSuccess: () => {
        toast.success("Transação realizada com sucesso");
        queryClient.invalidateQueries("stock-items");
        queryClient.invalidateQueries("stock-list");
      },
      onError: (err) => {
        toast.error(
          "Desculpe não conseguimos realizar a transação, tente mais tarde"
        );
        console.log(err);
      },
    }
  );

  const handleEntryTransaction: SubmitHandler<
    EntryTransactionItemData
  > = async (data, event) => {
    event?.preventDefault();

    await entryTransactionItem.mutateAsync(data);

    onClose();
  };

  return { register, handleSubmit, handleEntryTransaction };
};
