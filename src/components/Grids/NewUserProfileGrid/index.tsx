/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useUser } from "@/contexts/UserContext";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { List, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const createUserSchema = z.object({
  user_name: z.string().nonempty(),
  complete_name: z.string().nonempty(),
  title: z.string(),
  department_id: z.coerce.number(),
  telephone: z.coerce.number().nullable(),
  direct_boss: z.string().nonempty(),
  smtp: z.string().nonempty(),
});

type CreateUserData = z.infer<typeof createUserSchema>;

interface NewUserProfileGridProps {
  isSending: boolean;
  setIsSending: Dispatch<SetStateAction<boolean>>;
}

export function NewUserProfileGrid({
  isSending,
  setIsSending,
}: NewUserProfileGridProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  });

  useEffect(() => {
    () => setIsSending(!isSending);
  }, [isSubmitting]);

  const { createUser } = useUser();
  const { data: departments } = useFetchDepartmentsList();
  const { data: users } = useFetchUsersList({});

  const handleCreate: SubmitHandler<CreateUserData> = async (data, event) => {
    event?.preventDefault();

    await createUser.mutateAsync(data);

    reset();
  };

  return (
    <SimpleGrid
      as="form"
      id="create_user"
      onSubmit={handleSubmit(handleCreate)}
      columns={{ base: 1, md: 2 }}
      spacing={10}
      marginTop={8}
    >
      <List spacing={4}>
        <Input size="md" label="Usuário" {...register("user_name")} />

        <Input size="md" label="E-mail" {...register("smtp")} />

        <Input
          size="md"
          label="Ramal"
          {...register("telephone")}
          type="number"
        />
      </List>

      <List spacing={4}>
        <Input
          size="md"
          label="Nome Completo"
          {...register("complete_name")}
          type="text"
        />

        <Select
          label="Departamento"
          {...register("department_id")}
          placeholder="Selecione o Departamento"
        >
          {departments?.departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>

        <Input size="md" label="Cargo" {...register("title")} />

        <Select
          label="Chefia Imediata"
          {...register("direct_boss")}
          placeholder="Selecione a Chefia imediata"
        >
          {users?.users.map((user) => (
            <option key={user.user_name} value={user.user_name}>
              {user.user_name}
            </option>
          ))}
        </Select>
      </List>
    </SimpleGrid>
  );
}
