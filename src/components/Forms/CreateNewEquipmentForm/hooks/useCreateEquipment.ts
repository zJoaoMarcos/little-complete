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

  const typesOfEquipments = [
    { value: "notebook", option: "Notebook" },
    { value: "desktop", option: "Desktop" },
    { value: "monitor", option: "Monitor" },
    { value: "vr", option: "Vr" },
    { value: "tablet", option: "Tablet" },
    { value: "smartphone", option: "Celular" },
    { value: "scanner", option: "Scanner" },
  ];

  const { data: departmentList } = useDepartmentsList({
    key: "select-department",
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
    reset,
  } = useForm<CreateEquipmentData>({
    resolver: zodResolver(createEquipmetSchema),
    defaultValues: {
      purchaseDate: null,
      slots: null,
      storage0Syze: null,
      storage1Syze: null,
      storage0Type: null,
      storage1Type: null,
    },
  });

  console.log(errors);

  const createEquipment = useMutation(
    async (data: CreateEquipmentData) => {
      const res = await api.post<CreateEquipmentData>("/equipments", {
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
    typesOfEquipments,
  };
};
