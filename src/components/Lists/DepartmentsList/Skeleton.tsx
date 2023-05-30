import { SimpleGrid, Skeleton } from "@chakra-ui/react";

export function DepartmentListSkeleton() {
  return (
    <SimpleGrid columns={2} spacingX={10} spacingY={6} mb={10}>
      {Array.from({ length: 26 }).map((_, index) => (
        <Skeleton key={index} height="60px" />
      ))}
    </SimpleGrid>
  );
}
