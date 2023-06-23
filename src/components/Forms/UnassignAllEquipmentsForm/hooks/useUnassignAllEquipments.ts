import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { UnassignAllEquipmentsData } from "./types";

export const useUnassignAllEquipments = (userId: string) => {
  const unassignAllEquipments = useMutation(
    async (data: UnassignAllEquipmentsData) => {
      const res = await api.delete<UnassignAllEquipmentsData>(
        `equipments/all-assignments/${data.userId}`
      );

      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        toast.success("Equipamento atribuido com sucesso");
        queryClient.invalidateQueries({
          queryKey: ["user", variables.userId],
        });
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos atribuir o equipamento, tente mais tarde"
        );
      },
    }
  );

  const handleUnassign = async () => {
    await unassignAllEquipments.mutateAsync({ userId });
  };

  return { handleUnassign };
};
