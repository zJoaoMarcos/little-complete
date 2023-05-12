import { Input } from "@/components/Form/input";
import { useDepartment } from "@/contexts/DepartmentContext";
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

  const { updateDepartment } = useDepartment();

  const handleUpdate: SubmitHandler<UpdateDepartmentData> = async (
    data,
    event
  ) => {
    event.preventDefault();

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
        size="sm"
      />

      <Input
        {...register("board")}
        label="Board"
        isReadOnly={isEditable}
        size="sm"
      />

      <Input
        {...register("cost_center")}
        label="Centro de Custo"
        isReadOnly={isEditable}
        size="sm"
      />

      <Checkbox
        size="md"
        mb="auto"
        colorScheme="purple"
        borderColor="purple"
        {...register("is_board")}
        placeholder="É Diretoria"
        isReadOnly={isEditable}
      >
        É uma Diretoria ?
      </Checkbox>

      <Input
        {...register("responsible_id")}
        label="Usuário Responsável"
        isReadOnly={isEditable}
        size="sm"
      />

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
