import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUser } from "@/contexts/Users";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
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

  const { createUser } = useUser();
  const { data: users } = useFetchUsersList({});
  const { data: departments } = useFetchDepartmentsList({});

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
