import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useUser } from "@/contexts/UserContext";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { List, SimpleGrid } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type UpdateUserData = {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: number;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date | null;
  demission_date: Date | null;
  status: string;
};

interface UserProfileGridProps {
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
    status: string;
  };
  isEditable: boolean;
}

export function UserProfileGrid({ user, isEditable }: UserProfileGridProps) {
  const { data } = useFetchDepartmentsList();

  const { register, handleSubmit, formState, reset } = useForm<UpdateUserData>({
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
      status: user.status,
    },
  });

  const { isSubmitting } = formState;

  const { updateUser } = useUser();

  const handleUpdate: SubmitHandler<UpdateUserData> = async (data, event) => {
    event.preventDefault();

    await updateUser.mutateAsync(data);

    reset();
  };

  return (
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
          isReadOnly={isEditable}
        >
          {data?.departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>

        <Input
          size="md"
          label="Chefia Imediata"
          {...register("direct_boss")}
          isReadOnly={isEditable}
        />
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
  );
}
