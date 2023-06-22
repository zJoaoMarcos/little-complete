import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useDepartmentsList } from "@/hooks/useDepartmentsList";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createEquipmetSchema } from "./schema";
import { CreateEquipmentData } from "./types";

export const useCreateEquipment = () => {
  const [hasExtraStorage, setHasExtraStorage] = useState(false);

  const { data: departmentList } = useDepartmentsList({
    key: "select-department",
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
    reset,
  } = useForm<CreateEquipmentData>({
    resolver: zodResolver(createEquipmetSchema),
    defaultValues: {
      purchase_date: null,
      slots: null,
      storage0_syze: null,
      storage1_syze: null,
    },
  });

  const createEquipment = useMutation(
    async (data: CreateEquipmentData) => {
      const res = await api.post<CreateEquipmentData>("inventory/equipment", {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Equipamento registrado com sucesso");
        queryClient.invalidateQueries("equipments");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos registrar o equipamento, tente mais tarde"
        );
      },
    }
  );

  const handleCreate: SubmitHandler<CreateEquipmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await createEquipment.mutateAsync(data);

    reset();
  };

  return {
    handleCreate,
    handleSubmit,
    departmentList,
    register,
    isDirty,
    isSubmitting,
    hasExtraStorage,
    setHasExtraStorage,
  };
};
