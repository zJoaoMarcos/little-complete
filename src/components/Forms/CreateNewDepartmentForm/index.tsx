import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { Button, Checkbox, SimpleGrid } from "@chakra-ui/react";
import { useCreateDepartment } from "./useCreateDepartment";

export function CreateNewDepartmentForm() {
  const {
    handleCreate,
    handleSubmit,
    isSubmitting,
    register,
    departments,
    users,
  } = useCreateDepartment();

  return (
    <SimpleGrid
      as="form"
      id="new_department"
      onSubmit={handleSubmit(handleCreate)}
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

      <Select
        label="Board"
        {...register("board")}
        size="sm"
        placeholder="Selecione o responsável"
      >
        {departments?.departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </Select>

      <Input
        size="sm"
        {...register("cost_center")}
        label="Centro de Custo"
        type="number"
        placeholder="Ex: 999999"
      />

      <Checkbox
        size="md"
        mt="8"
        colorScheme="purple"
        borderColor="purple"
        {...register("is_board")}
        placeholder="É Diretoria"
      >
        É uma diretoria ?
      </Checkbox>

      <Select
        label="Responsável"
        {...register("responsible_id")}
        size="sm"
        placeholder="Selecione o responsável"
      >
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
