/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  List,
  SimpleGrid,
} from "@chakra-ui/react";

import { Select } from "@/components/Form/Select";
import { Input } from "@/components/Form/input";
import { UseCreateUser } from "./hooks/useCreateUser";

export function CreateNewUserForm() {
  const {
    handleSubmit,
    register,
    handleCreate,
    isSubmitting,
    departments,
    users,
  } = UseCreateUser();

  return (
    <>
      <Flex mb="10" justify="space-between" align="center">
        <HStack spacing={8}>
          <Heading as="h3" fontWeight="semibold" fontSize={18}>
            Novo Usuário
          </Heading>
        </HStack>
        <Button
          type="submit"
          form="create_user"
          colorScheme="purple"
          isLoading={isSubmitting}
        >
          Enviar
        </Button>
      </Flex>

      <Divider />

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
            {departments?.departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </Select>

          <Input size="md" label="Cargo" {...register("title")} />

          <Select
            label="Chefia Imediata"
            {...register("direct_boss")}
            placeholder="Selecione a Chefia imediata"
          >
            {users?.users.map((user) => (
              <option key={user.user_name} value={user.user_name}>
                {user.user_name}
              </option>
            ))}
          </Select>
        </List>
      </SimpleGrid>
    </>
  );
}
