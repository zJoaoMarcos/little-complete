import { SimpleGrid } from "@chakra-ui/react";
import { UserCard } from "./UserCard";

interface User {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: string;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date;
  demission_date: Date | null;
  status: string;
}

interface UserListProps {
  users: User[];
}

export function UsersList({ users }: UserListProps) {
  return (
    <SimpleGrid columns={1} spacingX={10} spacingY={6} mb={10}>
      <>
        {users.map((user) => (
          <UserCard key={user.user_name} user={user} />
        ))}
      </>
    </SimpleGrid>
  );
}