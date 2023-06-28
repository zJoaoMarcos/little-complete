import { Button, Flex, HStack, List, SimpleGrid } from "@chakra-ui/react";
import { Archive, Pencil, X } from "@phosphor-icons/react";

import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { UseUpdateDataFormProps } from "./types";

export function UpdateUserDataForm({ user }: UseUpdateDataFormProps) {
  const {
    handleSubmit,
    handleUpdate,
    isDirty,
    isEditable,
    isSubmitting,
    register,
    setIsEditable,
    users,
    departments,
  } = useUpdateUser({ user });

  return (
    <Flex flexDir="column">
      <HStack ml="auto">
        <Button
          onClick={() => setIsEditable(!isEditable)}
          leftIcon={isEditable ? <Pencil /> : <X />}
          colorScheme={isEditable ? "purple" : "red"}
        >
          {isEditable ? "Editar" : "Cancelar"}
        </Button>

        <Button
          hidden={isEditable}
          form="update_user"
          mr="auto"
          type="submit"
          size="md"
          colorScheme="purple"
          leftIcon={<Archive />}
          isLoading={isSubmitting}
          isDisabled={!isDirty}
        >
          Enviar
        </Button>
      </HStack>

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
            size="md"
            isDisabled={isEditable}
          >
            <option value={user.department.id}>{user.department.name}</option>
            {departments?.departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </Select>

          <Select
            label="Chefia Imediata"
            size="md"
            {...register("direct_boss")}
            isDisabled
          >
            <option value={user.direct_boss}>{user.direct_boss}</option>
            {users?.users.map((user) => (
              <option key={user.user_name} value={user.user_name}>
                {user.user_name}
              </option>
            ))}
          </Select>
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

          {user.status === "disabled" && (
            <Input
              size="md"
              label="Data de Demissão"
              {...register("demission_date")}
              type="date"
              isReadOnly={isEditable}
            />
          )}
        </List>
      </SimpleGrid>
    </Flex>
  );
}
