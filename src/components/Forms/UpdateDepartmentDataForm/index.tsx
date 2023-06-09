import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { Button, Checkbox, Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { Archive, Pencil, X } from "@phosphor-icons/react";
import { useUpdateDepartment } from "./hooks/useUpdateDepartment";
import { UpdateDepartmentDataFormProps } from "./types";

export function UpdateDepartmentDataForm({
  department,
}: UpdateDepartmentDataFormProps) {
  const {
    handleSubmit,
    handleUpdate,
    register,
    isEditable,
    setIsEditable,
    users,
    isSubmitting,
  } = useUpdateDepartment({ department });

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
          mt="10"
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
          size="lg"
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
