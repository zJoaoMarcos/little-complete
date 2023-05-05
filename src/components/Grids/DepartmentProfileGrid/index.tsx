import { Input } from "@/components/Form/input";
import { Button, SimpleGrid } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type UpdateDepartmentData = {
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
        name: department.name,
        cost_center: department.cost_center,
        is_board: department.is_board,
        board: department.board,
        responsible_id: department.responsible_id,
      },
    });

  return (
    <SimpleGrid
      as="form"
      columns={{ base: 1, md: 2 }}
      spacing={10}
      marginTop={8}
    >
      <Input {...register("name")} label="Nome" isDisabled={isEditable} />
      <Input {...register("board")} label="Board" isDisabled={isEditable} />
      <Input
        {...register("cost_center")}
        label="Centro de Custo"
        isDisabled={isEditable}
      />
      <Input {...register("is_board")} label="Owner" isDisabled={isEditable} />
      <Input
        {...register("responsible_id")}
        label="Usuário Responsável"
        isDisabled={isEditable}
      />
      <Button
        hidden={isEditable}
        type="submit"
        isDisabled={isEditable}
        mt="auto"
        size="lg"
        colorScheme="purple"
      >
        Alterar
      </Button>
    </SimpleGrid>
  );
}
