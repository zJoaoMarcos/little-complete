import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { UnassignEquipmentData } from "./types";

export const useUnassignEquipment = (
  equipmentId: string,
  onClose: () => void
) => {
  const unassignEquipment = useMutation(
    async (data: UnassignEquipmentData) => {
      await api.delete<UnassignEquipmentData>(
        `user-assignments/${data.equipment_id}`
      );
    },
    {
      onSuccess: (data, variables) => {
        Promise.all([
          queryClient.invalidateQueries(["equipment", variables.equipment_id]),
          queryClient.invalidateQueries(["user", variables.username]),
        ]);
        toast.success("Equipamento atribuido com sucesso");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos atribuir o equipamento, tente mais tarde"
        );
      },
    }
  );

  const handleUnassign = async () => {
    await unassignEquipment.mutateAsync({ equipment_id: equipmentId });

    onClose();
  };

  return { handleUnassign };
};
