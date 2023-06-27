import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { editStockItemSchema } from "./schema";

import { EditStockItemData, useEditStockItemProps } from "./types";

export const useEditStockItem = ({ item }: useEditStockItemProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditStockItemData>({
    resolver: zodResolver(editStockItemSchema),
    defaultValues: {
      id: item.id,
      category: item.category,
      brand: item.brand,
      model: item.model,
      type: item.type,
    },
  });

  const editStockItem = useMutation(
    async (data: EditStockItemData) => {
      await api.patch<EditStockItemData>(`stock/items/${data.id}`, {
        ...data,
      });
    },
    {
      onSuccess: () => {
        toast.success("Item foi editado com sucesso");
        queryClient.invalidateQueries("stockItems");
      },
      onError: (err) => {
        toast.error("Desculpe não conseguimos editar o item, tente mais tarde");
        console.log(err);
      },
    }
  );

  const handleEditItem: SubmitHandler<EditStockItemData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await editStockItem.mutateAsync(data);
  };

  return {
    errors,
    register,
    handleSubmit,
    handleEditItem,
  };
};
