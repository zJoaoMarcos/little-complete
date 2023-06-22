import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { OutputTransactionItemSchema } from "./schema";
import { OutputTransactionItemData } from "./types";

export const useOutpuTransactionItem = (itemId: string) => {
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

  const outputTransactionItem = useMutation(
    async (data: OutputTransactionItemData) => {
      await api.post(`stock/items/${data.id}/transaction/output`, {
        ...data,
      });
    },
    {
      onSuccess: () => {
        toast.success("Transação realizada com sucesso");
        queryClient.invalidateQueries("stockItems");
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
  };

  return { register, handleSubmit, handleOutputTransactionItem };
};
