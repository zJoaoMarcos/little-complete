import { SimpleGrid } from "@chakra-ui/react";
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
  departments: Department[];
}

export function DepartmentsList({ departments }: DepartmentsListProps) {
  return (
    <SimpleGrid columns={2} spacingX={10} spacingY={6} mb={10}>
      <>
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </>
    </SimpleGrid>
  );
}
