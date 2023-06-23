import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { UpdateUserStatusSchema } from "./schema";
import { UpdateUserStatusData } from "./types";

export const useUpdateUserStatus = (username: string, onClose: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateUserStatusData>({
    resolver: zodResolver(UpdateUserStatusSchema),
    defaultValues: { user_name: username },
  });

  const updateStatus = useMutation(
    async (data: UpdateUserStatusData) => {
      const response = await api.patch<UpdateUserStatusData>(
        `users/status/${data.user_name}`,
        {
          status: data.status,
        }
      );

      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["users"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["users-pendencies"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["user", variables.user_name],
          }),
        ]);
        toast.success("Status do usuário alterado com sucesso");
      },

      onError: () => {
        toast.error(
          "Desculpe não conseguimos alterar o status do usuário, tente mais tarde. "
        );
      },
    }
  );

  const handleUpdateStatus: SubmitHandler<UpdateUserStatusData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateStatus.mutateAsync(data);

    onClose();
  };

  return { handleUpdateStatus, register, handleSubmit, isSubmitting, isDirty };
};
