import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useDepartment } from "@/contexts/Department";
import { useUsersList } from "@/hooks/useUsersLists";
import { updateDepartmentSchema } from "./schema";
import { UpdateDepartmentData, UseUpdateDepartmentParams } from "./types";

export const useUpdateDepartment = ({
  department,
}: UseUpdateDepartmentParams) => {
  const [isEditable, setIsEditable] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<UpdateDepartmentData>({
    resolver: zodResolver(updateDepartmentSchema),
    defaultValues: {
      id: department.id,
      name: department.name,
      cost_center: department.cost_center,
      is_board: department.is_board,
      board: department.board,
      responsible_id: department.responsible_id
        ? department.responsible_id
        : null,
    },
  });

  const { data: users } = useUsersList({ key: "all-users-list", page: 0 });
  const { updateDepartment } = useDepartment();

  const handleUpdate: SubmitHandler<UpdateDepartmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateDepartment.mutateAsync(data);

    setIsEditable(true);
  };

  return {
    users,
    handleSubmit,
    handleUpdate,
    isEditable,
    setIsEditable,
    register,
    isSubmitting,
  };
};
