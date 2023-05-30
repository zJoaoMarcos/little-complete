import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Warning } from "@phosphor-icons/react";
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
        {users &&
          users.map((user) => <UserCard key={user.user_name} user={user} />)}

        {users?.length === 0 && (
          <Flex
            w="full"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mt="20"
          >
            <Warning color="purple" size={100} />
            <Text>
              Infelizmente não conseguimos achar nenhum usuário, tente mais
              tarde.
            </Text>
          </Flex>
        )}
      </>
    </SimpleGrid>
  );
}
