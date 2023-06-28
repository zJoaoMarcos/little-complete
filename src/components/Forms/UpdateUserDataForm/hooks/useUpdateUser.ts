import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { useDepartmentsList } from "@/hooks/useDepartmentsList";
import { useUsersList } from "@/hooks/useUsersLists";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { UpdateUserSchema } from "./schema";
import { UpdateUserData, UseUpdateUserParams } from "./types";

export const useUpdateUser = ({ user }: UseUpdateUserParams) => {
  const [isEditable, setIsEditable] = useState(true);

  const { data: departments } = useDepartmentsList({});
  const { data: users } = useUsersList({});

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      user_name: user.user_name,
      complete_name: user.complete_name,
      title: user.title,
      department_id: user.department.id,
      direct_boss: user.direct_boss,
      smtp: user.smtp,
      telephone: user.telephone,
      admission_date: user.admission_date,
      demission_date: user.demission_date,
    },
  });

  const updateUser = useMutation(
    async (data: UpdateUserData) => {
      const res = await api.patch<UpdateUserData>(`users/${data.user_name}`, {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: (data, variables) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["user", variables.user_name],
          }),
        ]);
        toast.success("Dados do usuário alterado com sucesso!");
        setIsEditable(!isEditable);
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos alterar os dados do usuário, tente mais tarde. "
        );
        setIsEditable(!isEditable);
      },
    }
  );

  const handleUpdate: SubmitHandler<UpdateUserData> = async (data, event) => {
    event?.preventDefault();

    await updateUser.mutateAsync(data);
  };
  return {
    handleSubmit,
    handleUpdate,
    departments,
    register,
    users,
    isDirty,
    isSubmitting,
    isEditable,
    setIsEditable,
  };
};
