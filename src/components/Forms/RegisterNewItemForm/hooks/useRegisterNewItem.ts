import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { RegisterNewItemSchema } from "./schema";
import { RegisterNewItemData } from "./type";

export const useRegisterNewItem = (onClose: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterNewItemData>({
    resolver: zodResolver(RegisterNewItemSchema),
  });

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

  const categories = [
    { id: 1, name: "Hardware", value: "hardware" },
    { id: 2, name: "Periféricos", value: "peripherals" },
    { id: 3, name: "Cabos", value: "cables" },
    { id: 4, name: "Outros", value: "others" },
  ];

  return {
    register,
    handleSubmit,
    handleRegister,
    errors,
    categories,
  };
};
