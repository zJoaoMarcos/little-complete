import { SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import { UserCard } from "./UserCard";

interface User {
  user_name: string;
  complete_name: string;
  title: string;
  department: { id: number; name: string };
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date | null;
  demission_date: Date | null;
  status: string;
}

interface UserListProps {
  users: User[] | undefined;
}

export function UsersList({ users }: UserListProps) {
  return (
    <SimpleGrid columns={1} spacingX={10} spacingY={6} mb={10}>
      <>
        {users ? (
          users?.map((user) => <UserCard key={user.user_name} user={user} />)
        ) : (
          <Stack w="full">
            <Skeleton height="60px" />
            <Skeleton height="60px" />
            <Skeleton height="60px" />
            <Skeleton height="60px" />
            <Skeleton height="60px" />
            <Skeleton height="60px" />
          </Stack>
        )}
      </>
    </SimpleGrid>
  );
}
