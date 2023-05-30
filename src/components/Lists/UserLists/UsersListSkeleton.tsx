import { SimpleGrid, Skeleton } from "@chakra-ui/react";

export function UsersListSkeleton() {
  return (
    <SimpleGrid columns={1} spacingX={10} spacingY={6} mb={10}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} height="60px" />
      ))}
    </SimpleGrid>
  );
}
