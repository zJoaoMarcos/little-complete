import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { RegisterNewItemSchema } from "./schema";
import { RegisterNewItemData } from "./type";

export const useRegisterNewItem = () => {
  const { register, handleSubmit } = useForm<RegisterNewItemData>({
    resolver: zodResolver(RegisterNewItemSchema),
  });

  const registerNewItem = useMutation(
    async (data: RegisterNewItemData) => {
      await api.post("items/", {
        ...data,
      });
    },
    {
      onSuccess: () => {
        toast.success("Item registrado com sucesso");
        queryClient.invalidateQueries("stockList");
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
  };

  return { register, handleSubmit, handleRegister };
};
