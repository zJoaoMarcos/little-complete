import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useUser } from "@/contexts/UserContext";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { List, SimpleGrid } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateUserData = {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: number;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
};

/* interface NewUserProfileGridProps {
  departments?: Department[];
} */

interface Department {
  id: number;
  name: string;
  cost_center: string;
  is_board: boolean;
  board: string;
  responsible_id: string;
}

export function NewUserProfileGrid() {
  const { register, handleSubmit, formState, reset } =
    useForm<CreateUserData>();

  const { isSubmitting } = formState;

  const { createUser } = useUser();

  const { data } = useFetchDepartmentsList();

  console.log(data);

  const handleCreate: SubmitHandler<CreateUserData> = async (data, event) => {
    event.preventDefault();

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
          {data?.departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>

        <Input size="md" label="Cargo" {...register("title")} />

        <Input size="md" label="Chefia Imediata" {...register("direct_boss")} />
      </List>
    </SimpleGrid>
  );
}
