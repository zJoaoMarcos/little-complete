import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useUser } from "@/contexts/Users";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { Button, Flex, HStack, List, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Archive, Pencil, X } from "@phosphor-icons/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const UpdateUserSchema = z.object({
  user_name: z.string(),
  complete_name: z.string(),
  title: z.string(),
  department_id: z.coerce.number(),
  telephone: z.coerce.number().nullable(),
  direct_boss: z.string(),
  smtp: z.string(),
  demission_date: z.date().nullable(),
  admission_date: z.date().nullable(),
  status: z.string(),
});

type UpdateUserData = z.infer<typeof UpdateUserSchema>;

interface UserDetailsProps {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department: { id: number; name: string };
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date | null;
    demission_date: Date | null;
    status: string | null;
  };
}

export function UserDetails({ user }: UserDetailsProps) {
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
      telephone: user.telephone,
      direct_boss: user.direct_boss,
      smtp: user.smtp,
      admission_date: user.admission_date,
      demission_date: user.demission_date,
      status: user.status ? user.status : undefined,
    },
  });

  const { updateUser } = useUser();

  const handleUpdate: SubmitHandler<UpdateUserData> = async (data, event) => {
    event?.preventDefault();

    await updateUser.mutateAsync(data);

    setIsEditable(!isEditable);
  };

  return (
    <Flex flexDir="column">
      <HStack ml="auto">
        <Button
          onClick={() => setIsEditable(!isEditable)}
          leftIcon={isEditable ? <Pencil /> : <X />}
          colorScheme={isEditable ? "purple" : "red"}
        >
          {isEditable ? "Editar" : "Cancelar"}
        </Button>

        <Button
          hidden={isEditable}
          form="update_user"
          mr="auto"
          type="submit"
          size="md"
          colorScheme="purple"
          leftIcon={<Archive />}
          isLoading={isSubmitting}
          isDisabled={!isDirty}
        >
          Enviar
        </Button>
      </HStack>

      <SimpleGrid
        as="form"
        id="update_user"
        onSubmit={handleSubmit(handleUpdate)}
        columns={{ base: 1, md: 2 }}
        spacing={10}
        marginTop={8}
      >
        <List spacing={6}>
          <Input
            size="md"
            label="Usuário"
            {...register("user_name")}
            isReadOnly
            isDisabled={!isEditable}
          />

          <Input
            size="md"
            label="Cargo"
            {...register("title")}
            isReadOnly={isEditable}
          />

          <Select
            label="Departamento"
            {...register("department_id")}
            isDisabled={isEditable}
          >
            <option value={user.department.id}>{user.department.name}</option>
            {departments?.departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </Select>

          <Select
            label="Chefia Imediata"
            {...register("direct_boss")}
            isDisabled={isEditable}
          >
            <option value={user.direct_boss}>{user.direct_boss}</option>
            {users?.users.map((user) => (
              <option key={user.user_name} value={user.user_name}>
                {user.user_name}
              </option>
            ))}
          </Select>
        </List>

        <List spacing={6}>
          <Input
            size="md"
            label="E-mail"
            {...register("smtp")}
            isReadOnly={isEditable}
          />

          <Input
            size="md"
            label="Ramal"
            {...register("telephone")}
            isReadOnly={isEditable}
          />

          <Input
            size="md"
            label="Data de Admissão"
            {...register("admission_date")}
            type="date"
            isReadOnly={isEditable}
          />

          <Input
            size="md"
            label="Data de Demissão"
            {...register("demission_date")}
            type="date"
            isReadOnly={isEditable}
          />
        </List>
      </SimpleGrid>
    </Flex>
  );
}
