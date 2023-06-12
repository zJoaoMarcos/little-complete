import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useEquipment } from "@/contexts/Inventory";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { createEquipmetSchema } from "./schema";
import { CreateEquipmentData } from "./types";

export const useCreateEquipment = () => {
  const { data: departmentList } = useFetchDepartmentsList({});

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

  const { createEquipment } = useEquipment();

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
  };
};
