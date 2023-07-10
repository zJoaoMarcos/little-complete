import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { useStockGroupList } from "@/hooks/useStockGroupList";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { RegisterNewItemSchema } from "./schema";
import { RegisterNewItemData } from "./type";

export const useRegisterNewItem = (onClose: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterNewItemData>({
    resolver: zodResolver(RegisterNewItemSchema),
    defaultValues: {
      isNewTypeGroup: false,
    },
  });

  const isNewType = watch("isNewTypeGroup");
  const { data: typeList } = useStockGroupList(0);

  const registerNewItem = useMutation(
    async (data: RegisterNewItemData) => {
      await api.post("stock/items/", {
        ...data,
      });
    },
    {
      onSuccess: () => {
        toast.success("Item registrado com sucesso");
        queryClient.invalidateQueries("stock-list");
        queryClient.invalidateQueries("stock-items");
      },
      onError: (err) => {
        toast.error(
          "Desculpe não conseguimos registrar o item, tente mais tarde"
        );
        console.log(err);
      },
    }
  );

  const handleRegister: SubmitHandler<RegisterNewItemData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await registerNewItem.mutateAsync(data);

    onClose();
  };

  return {
    register,
    handleSubmit,
    handleRegister,
    typeList,
    isNewType,
    errors,
  };
};
