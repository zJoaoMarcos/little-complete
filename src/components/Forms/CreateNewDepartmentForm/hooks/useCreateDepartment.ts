import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { useDepartmentsList } from "@/hooks/useDepartmentsList";
import { useUsersList } from "@/hooks/useUsersLists";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
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

  const { data: departments } = useDepartmentsList({
    key: "all-departments-list",
    page: 0,
  });
  const { data: users } = useUsersList({ key: "all-users-list", page: 0 });

  const { push } = useRouter();

  const createDepartment = useMutation(
    async (data: CreateDepartmentData) => {
      const res = await api.post("departments", {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Departamento criado com sucesso");
        queryClient.invalidateQueries("all-departments-list");
        push(`/departments`);
      },
      onError: (err: AxiosError) => {
        toast.error(
          `Desculpe não conseguimos criar o departamento, tente mais tarde.${err.response?.data?.error}`
        );
      },
    }
  );

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
