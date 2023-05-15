import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useDepartment } from "@/contexts/DepartmentContext";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { Button, Checkbox, Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { Archive, Pencil, X } from "@phosphor-icons/react";
import { useState } from "react";
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
}

export function DepartmentProfileGrid({
  department,
}: DepartmentProfileGridProps) {
  const [isEditable, setIsEditable] = useState(true);

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
    <Flex flexDir="column">
      <HStack ml="auto">
        <Button
          hidden={isEditable}
          form="update_form"
          mr="auto"
          type="submit"
          size="md"
          colorScheme="purple"
          leftIcon={<Archive />}
        >
          Salvar
        </Button>

        <Button
          onClick={() => setIsEditable(!isEditable)}
          leftIcon={isEditable ? <Pencil /> : <X />}
          colorScheme={isEditable ? "purple" : "red"}
        >
          {isEditable ? "Editar" : "Cancelar"}
        </Button>
      </HStack>

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
      </SimpleGrid>
    </Flex>
  );
}
