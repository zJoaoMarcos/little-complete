import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { UpdateEquipmentStatusSchema } from "./schema";
import { UpdateEquipmentStatusData } from "./types";

export const useUpdateEquipmentStatus = (equipmentId: string) => {
  const updateEquipmentStatus = useMutation(
    async (data: UpdateEquipmentStatusData) => {
      const res = await api.patch<UpdateEquipmentStatusData>(
        `inventory/equipment/status/${data.equipment_id}`,
        {
          ...data,
        }
      );

      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        toast.success("Equipamento atribuido com sucesso");
        queryClient.invalidateQueries({
          queryKey: ["equipment", variables.equipment_id],
        });
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos atribuir o equipamento, tente mais tarde"
        );
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateEquipmentStatusData>({
    resolver: zodResolver(UpdateEquipmentStatusSchema),
    defaultValues: { equipment_id: equipmentId },
  });

  const handleUpdateStatus: SubmitHandler<UpdateEquipmentStatusData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateEquipmentStatus.mutateAsync(data);
  };

  return { register, handleSubmit, handleUpdateStatus, isSubmitting, isDirty };
};
