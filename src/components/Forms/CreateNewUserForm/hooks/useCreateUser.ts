import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { useDepartmentsList } from "@/hooks/useDepartmentsList";
import { useUsersList } from "@/hooks/useUsersLists";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { createUserSchema } from "./schema";
import { CreateUserData } from "./types";

export const UseCreateUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  });

  const createUser = useMutation(
    async (data: CreateUserData) => {
      const res = await api.post<CreateUserData>("users", {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Usuário criado com sucesso");
        queryClient.invalidateQueries("users");
      },
      onError: (err) => {
        toast.error(
          `Desculpe não conseguimos criar o usuário, tente mais tarde. `
        );
        console.log(err);
      },
    }
  );

  const { data: users } = useUsersList({ key: "all-users-list", page: 0 });
  const { data: departments } = useDepartmentsList({
    key: "all-departments-list",
    page: 0,
  });

  const handleCreate: SubmitHandler<CreateUserData> = async (data, event) => {
    event?.preventDefault();

    await createUser.mutateAsync(data);

    reset();
  };

  return {
    register,
    handleCreate,
    handleSubmit,
    isSubmitting,
    departments,
    users,
  };
};
