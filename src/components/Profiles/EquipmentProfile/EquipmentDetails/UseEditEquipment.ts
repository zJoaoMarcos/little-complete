import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useDepartmentsList } from "@/hooks/useDepartmentsList";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { updateEquipmentSchema } from "./schema";
import { EquipmentDetailsProps, UpdateEquipmentData } from "./types";

export const useEditEquipment = ({ equipment }: EquipmentDetailsProps) => {
  const [isBlocked, setIsBlocked] = useState(true);
  const [hasExtraStorage, setHasExtraStorage] = useState(false);

  const { data: departmentList } = useDepartmentsList({
    key: "select-department",
  });

  const updateEquipment = useMutation(
    async (data: UpdateEquipmentData) => {
      await api.patch<UpdateEquipmentData>(`/equipments/${data.id}`, {
        ...data,
      });
    },
    {
      onSuccess: (data, variables) => {
        toast.success("Equipamento salvo com sucesso");
        queryClient.invalidateQueries(["equipments", variables.id]);
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos desatrubuir o equipamento, tente mais tarde"
        );
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<UpdateEquipmentData>({
    resolver: zodResolver(updateEquipmentSchema),
    defaultValues: {
      id: equipment.id,
      type: equipment.type,
      patrimony: equipment.patrimony,
      brand: equipment.brand ? equipment.brand : undefined,
      model: equipment.model ? equipment.model : undefined,
      supplier: equipment.purchase.supplier,
      invoice: equipment.purchase.invoice,
      warranty: equipment.purchase.warranty,
      purchaseDate: equipment.purchase.purchaseDate,
      cpu: equipment.config.cpu,
      ram: equipment.config.ram,
      slots: equipment.config.storage.slots ?? undefined,
      serviceTag: equipment.serviceTag,
      storage0Type: equipment.config.storage.storage0Type,
      storage0Syze: equipment.config.storage.storage0Syze,
      storage1Type: equipment.config.storage.storage1Type,
      storage1Syze: equipment.config.storage.storage1Syze,
      video: equipment.config.video,
      departmentId: equipment.department.id ?? undefined,
    },
  });

  const handleUpdate: SubmitHandler<UpdateEquipmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateEquipment.mutateAsync({ ...data });

    setIsBlocked(true);
  };

  const handleCancel = () => {
    setIsBlocked(!isBlocked);
    reset();
  };

  return {
    handleSubmit,
    handleCancel,
    handleUpdate,
    register,
    isBlocked,
    isSubmitting,
    isDirty,
    departmentList,
    hasExtraStorage,
    setHasExtraStorage,
  };
};
