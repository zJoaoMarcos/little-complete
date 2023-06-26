import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { useUsersList } from "@/hooks/useUsersLists";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { OutputTransactionItemSchema } from "./schema";
import { OutputTransactionItemData } from "./types";

export const useOutpuTransactionItem = (
  itemId: string,
  onClose: () => void
) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<OutputTransactionItemData>({
    resolver: zodResolver(OutputTransactionItemSchema),
    defaultValues: {
      id: itemId,
    },
  });

  const { data: session } = useSession();
  const { data: usersList } = useUsersList({ key: "all-users-list" });

  const outputTransactionItem = useMutation(
    async (data: OutputTransactionItemData) => {
      await api.post(`stock/items/${data.id}/transaction/output`, {
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

  const handleOutputTransactionItem: SubmitHandler<
    OutputTransactionItemData
  > = async (data, event) => {
    event?.preventDefault();

    await outputTransactionItem.mutateAsync(data);

    reset();
    onClose();
  };

  return { register, handleSubmit, handleOutputTransactionItem, usersList };
};
