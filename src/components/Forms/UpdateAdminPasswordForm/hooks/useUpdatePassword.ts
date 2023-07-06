import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UpdatePasswordSchema } from "./schema";
import { UpdatePasswordData } from "./types";

export const useUpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<UpdatePasswordData>({
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const handleUdpatePassword: SubmitHandler<UpdatePasswordData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await api
      .patch("administrators/update-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      .catch(() => {
        toast.error(
          "Desculpe não conseguimos alterar a sua senha, tente mais tarde"
        );
      })
      .then(() => {
        toast.success("Senha alterada com sucesso! 🎉");

        Router.push("/users");
      });
  };

  return {
    register,
    handleUdpatePassword,
    handleSubmit,
    isSubmitting,
    isDirty,
    errors,
  };
};
