import { SimpleGrid } from "@chakra-ui/react";
import { DepartmentCard } from "./DepartmentCard";

interface Department {
  name: string;
  cost_center: string;
  is_board: boolean;
  board: string;
}

interface DepartmentsListProps {
  departments: Department[];
}

export function DepartmentsList({ departments }: DepartmentsListProps) {
  return (
    <SimpleGrid columns={2} spacingX={10} spacingY={6} mb={10}>
      <>
        {departments.map((department) => (
          <DepartmentCard key={department.name} department={department} />
        ))}
      </>
    </SimpleGrid>
  );
}
