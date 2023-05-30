import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useDepartment } from "@/contexts/Department";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { Button, Checkbox, Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Archive, Pencil, X } from "@phosphor-icons/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const updateDepartmentSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  cost_center: z.coerce.number().nullable(),
  is_board: z.boolean().nullable(),
  board: z.string().nullable(),
  responsible_id: z.string().nullable(),
});

type UpdateDepartmentData = z.infer<typeof updateDepartmentSchema>;

interface DepartmentDetailsProps {
  department: {
    id: number;
    name: string;
    cost_center: number | null;
    is_board: boolean | null;
    board: string | null;
    responsible_id: string | null;
  };
}

export function DepartmentDetails({ department }: DepartmentDetailsProps) {
  const [isEditable, setIsEditable] = useState(true);

  const { register, handleSubmit, formState, reset } =
    useForm<UpdateDepartmentData>({
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

  const { isSubmitting } = formState;

  const { data: users } = useFetchUsersList({});
  const { updateDepartment } = useDepartment();

  const handleUpdate: SubmitHandler<UpdateDepartmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await updateDepartment.mutateAsync(data);

    setIsEditable(true);
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
          isLoading={isSubmitting}
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
        >
          É uma Diretoria ?
        </Checkbox>

        <Select
          label="Responsável"
          {...register("responsible_id")}
          size="md"
          isDisabled={isEditable}
        >
          {department.responsible_id && (
            <option value={department.responsible_id}>
              {department.responsible_id}
            </option>
          )}

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
