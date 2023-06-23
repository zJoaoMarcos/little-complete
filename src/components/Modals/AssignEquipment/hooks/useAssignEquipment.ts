import { useInvetoryList } from "@/hooks/useInventoryList";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AssignEquipmentData } from "./type";

export const useAssignEquipment = (userId: string, onClose: () => void) => {
  const [value, setValue] = useState("");

  const { data } = useInvetoryList({
    key: "assign-equipment",
    status: "available",
  });

  const assignEquipment = useMutation(
    async (data: AssignEquipmentData) => {
      const res = await api.post<AssignEquipmentData>(`user-assignments/`, {
        user_id: data.userId,
        equipment_id: data.equipmentId,
      });

      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        toast.success("Equipamento atribuido com sucesso");
        queryClient.invalidateQueries(["user", variables.userId]);
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos atribuir o equipamento, tente mais tarde"
        );
      },
    }
  );

  const handleAssign = async () => {
    await assignEquipment.mutateAsync({
      userId,
      equipmentId: value,
    });

    onClose();
  };

  return { handleAssign, data, setValue };
};
