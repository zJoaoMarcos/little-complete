import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useDepartment } from "@/contexts/Department";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { createDepartmentSchema } from "./schema";
import { CreateDepartmentData } from "./types";

export const useCreateDepartment = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateDepartmentData>({
    resolver: zodResolver(createDepartmentSchema),
  });

  const { createDepartment } = useDepartment();
  const { data: departments } = useFetchDepartmentsList({});
  const { data: users } = useFetchUsersList({});

  const handleCreate: SubmitHandler<CreateDepartmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await createDepartment.mutateAsync(data);

    reset();
  };

  return {
    isSubmitting,
    handleCreate,
    users,
    departments,
    register,
    handleSubmit,
  };
};
