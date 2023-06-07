import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUser } from "@/contexts/Users";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { useState } from "react";
import { UpdateUserSchema } from "./schema";
import { UpdateUserData, UserDetailsProps } from "./types";

export const UseUpdateUser = ({ user }: UserDetailsProps) => {
  const [isEditable, setIsEditable] = useState(true);

  const { data: departments } = useFetchDepartmentsList({});
  const { data: users } = useFetchUsersList({});

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

  const { updateUser } = useUser();

  const handleUpdate: SubmitHandler<UpdateUserData> = async (data, event) => {
    event?.preventDefault();

    await updateUser.mutateAsync(data);

    setIsEditable(!isEditable);
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
