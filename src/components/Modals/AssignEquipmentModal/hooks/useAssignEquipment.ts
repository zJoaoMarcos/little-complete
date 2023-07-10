import { useInvetoryList } from "@/hooks/useInventoryList";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AssignEquipmentData } from "./type";

export const useAssignEquipment = (userId: string, onClose: () => void) => {
  const [type, setType] = useState("notebook");
  const [value, setValue] = useState("");

  const typeOptions = [
    { value: "notebook", option: "Notebook" },
    { value: "desktop", option: "Desktop" },
    { value: "telephone", option: "Ramal" },
    { value: "monitor", option: "Monitor" },
    { value: "vr", option: "Óculos VR" },
    { value: "scanner", option: "Scanner" },
  ];

  const { data } = useInvetoryList({
    key: "assign-equipment",
    status: "available",
    type,
  });

  const assignEquipment = useMutation(
    async (data: AssignEquipmentData) => {
      const res = await api.post<AssignEquipmentData>(`equipments/assign/`, {
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

  return { handleAssign, data, setValue, setType, typeOptions };
};
