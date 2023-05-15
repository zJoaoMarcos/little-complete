import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useDepartment } from "@/contexts/DepartmentContext";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { Button, Checkbox, SimpleGrid } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type UpdateDepartmentData = {
  id: number;
  name: string;
  cost_center: string;
  is_board: boolean;
  board: string;
  responsible_id: string;
};

interface DepartmentProfileGridProps {
  department: {
    id: number;
    name: string;
    cost_center: string;
    is_board: boolean;
    board: string;
    responsible_id: string;
  };

  isEditable: boolean;
}

export function DepartmentProfileGrid({
  department,
  isEditable,
}: DepartmentProfileGridProps) {
  const { register, handleSubmit, formState, reset } =
    useForm<UpdateDepartmentData>({
      defaultValues: {
        id: department.id,
        name: department.name,
        cost_center: department.cost_center,
        is_board: department.is_board,
        board: department.board,
        responsible_id: department.responsible_id,
      },
    });

  const { isSubmitting } = formState;

  const { data: users } = useFetchUsersList();

  const { updateDepartment } = useDepartment();

  const handleUpdate: SubmitHandler<UpdateDepartmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateDepartment.mutateAsync(data);

    reset();
  };

  return (
    <SimpleGrid
      as="form"
      id="update_form"
      onSubmit={handleSubmit(handleUpdate)}
      columns={{ base: 1, md: 2 }}
      spacing={10}
      marginTop={8}
    >
      <Input
        {...register("name")}
        label="Nome"
        isReadOnly={isEditable}
        size="md"
      />

      <Input
        {...register("board")}
        label="Board"
        isReadOnly={isEditable}
        size="md"
      />

      <Input
        {...register("cost_center")}
        label="Centro de Custo"
        isReadOnly={isEditable}
        size="md"
      />

      <Checkbox
        size="md"
        mb="auto"
        colorScheme="purple"
        borderColor="purple"
        {...register("is_board")}
        placeholder="É Diretoria"
        isDisabled={isEditable}
        defaultChecked={department.is_board}
      >
        É uma Diretoria ?
      </Checkbox>

      <Select
        label="Responsável"
        {...register("responsible_id")}
        size="md"
        isDisabled={isEditable}
      >
        {users?.users.map((user) => (
          <option key={user.user_name} value={user.user_name}>
            {user.user_name}
          </option>
        ))}
      </Select>

      <Button
        form="update_form"
        hidden={isEditable}
        ml="auto"
        type="submit"
        mt="auto"
        size="sm"
        colorScheme="purple"
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Alterar
      </Button>
    </SimpleGrid>
  );
}
