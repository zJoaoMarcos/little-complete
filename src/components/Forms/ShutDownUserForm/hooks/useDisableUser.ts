import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { UpdateUserStatusData } from "./types";

export const useDisableUser = (username: string) => {
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

  const handleDisabled = async () => {
    await updateStatus.mutateAsync({ user_name: username, status: "disabled" });
  };

  return { handleDisabled };
};
