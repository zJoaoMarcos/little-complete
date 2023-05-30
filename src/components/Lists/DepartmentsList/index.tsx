import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Warning } from "@phosphor-icons/react";
import { DepartmentCard } from "./DepartmentCard";

interface Department {
  id: number;
  name: string;
  cost_center: number | null;
  is_board: boolean | null;
  board: string | null;
  responsible_id: string | null;
}

interface DepartmentsListProps {
  departments: Department[] | undefined;
}

export function DepartmentsList({ departments }: DepartmentsListProps) {
  const columns = departments?.length! >= 12 ? 2 : 1;
  return (
    <SimpleGrid columns={columns} spacingX={10} spacingY={6} mb={10}>
      {departments &&
        departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}

      {departments?.length === 0 && (
        <Flex
          w="full"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          mt="20"
        >
          <Warning color="purple" size={100} />
          <Text>
            Infelizmente não conseguimos achar nenhum departamento, tente mais
            tarde.
          </Text>
        </Flex>
      )}
    </SimpleGrid>
  );
}
