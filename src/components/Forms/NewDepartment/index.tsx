import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useDepartment } from "@/contexts/DepartmentContext";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { Button, Checkbox, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const createDepartmentSchema = z.object({
  name: z.string(),
  cost_center: z.coerce.number(),
  is_board: z.boolean(),
  board: z.string(),
  responsible_id: z.string(),
});

type CreateDepartmentData = z.infer<typeof createDepartmentSchema>;

export function NewDepartmentForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateDepartmentData>({
    resolver: zodResolver(createDepartmentSchema),
  });

  const { createDepartment } = useDepartment();
  const { data: users } = useFetchUsersList({});

  const handleCreateDepartment: SubmitHandler<CreateDepartmentData> = async (
    data,
    event
  ) => {
    event?.preventDefault();

    await createDepartment.mutateAsync(data);

    reset();
  };

  return (
    <SimpleGrid
      as="form"
      id="new_department"
      onSubmit={handleSubmit(handleCreateDepartment)}
      columns={{ base: 1, md: 2 }}
      spacing={10}
      marginTop={8}
    >
      <Input
        size="sm"
        {...register("name")}
        label="Nome"
        type="text"
        placeholder="Ex: Tecnologia da Informação"
      />

      <Input
        size="sm"
        {...register("board")}
        label="Board"
        type="text"
        placeholder="Ex: Vice Presidência"
      />

      <Input
        size="sm"
        {...register("cost_center")}
        label="Centro de Custo"
        type="number"
        placeholder="Ex: 999999"
      />

      <Checkbox
        size="md"
        mb="auto"
        colorScheme="purple"
        borderColor="purple"
        {...register("is_board")}
        placeholder="É Diretoria"
      >
        É uma Diretoria ?
      </Checkbox>

      <Select label="Responsável" {...register("responsible_id")}>
        {users?.users.map((user) => (
          <option key={user.user_name} value={user.user_name}>
            {user.user_name}
          </option>
        ))}
      </Select>

      <Button
        form="new_department"
        type="submit"
        mt="auto"
        ml="auto"
        size="sm"
        w={40}
        colorScheme="purple"
        isLoading={isSubmitting}
      >
        Enviar
      </Button>
    </SimpleGrid>
  );
}
