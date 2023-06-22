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
      await api.patch<UpdateEquipmentData>(`inventory/equipment/${data.id}`, {
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
    formState: { isSubmitting, isDirty },
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
      purchase_date: equipment.purchase.purchaseDate,
      cpu: equipment.config.cpu,
      ram: equipment.config.ram,
      slots: equipment.config.storage.slots ?? undefined,
      service_tag: equipment.serviceTag,
      storage0_type: equipment.config.storage.storage0Type,
      storage0_syze: equipment.config.storage.storage0Syze,
      storage1_type: equipment.config.storage.storage1Type ?? undefined,
      storage1_syze: equipment.config.storage.storage1Syze ?? undefined,
      video: equipment.config.video,
      department_id: equipment.department.id ?? undefined,
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
