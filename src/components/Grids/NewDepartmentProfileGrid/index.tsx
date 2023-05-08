import { Input } from "@/components/Form/input";
import { useDepartment } from "@/contexts/DepartmentContext";
import { Button, Checkbox, SimpleGrid } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateDepartmentData = {
  name: string;
  cost_center: string;
  is_board: boolean;
  board: string;
  responsible_id: string;
};

export function NewDepartmentProfileGrid() {
  const { register, handleSubmit, formState, reset } =
    useForm<CreateDepartmentData>({});

  const { createDepartment } = useDepartment();

  const handleCreateDepartment: SubmitHandler<CreateDepartmentData> = async (
    data,
    event
  ) => {
    event.preventDefault();

    console.log(data);

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

      <Input
        size="sm"
        {...register("responsible_id")}
        label="Usuário Responsável"
        type="text"
        placeholder="Ex: Carlos Alexandre"
      />

      <Button
        form="new_department"
        type="submit"
        mt="auto"
        ml="auto"
        size="sm"
        w={40}
        colorScheme="purple"
      >
        Enviar
      </Button>
    </SimpleGrid>
  );
}
