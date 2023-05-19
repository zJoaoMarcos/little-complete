import { UserAvatar } from "@/components/Avatars/UserAvatar";
import {
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CaretRight, Phone, Prohibit } from "@phosphor-icons/react";
import { useRouter } from "next/router";

interface UserCardProps {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department: { id: number; name: string };
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date | null;
    demission_date: Date | null;
    status: string | null;
  };
}

export function UserCard({ user }: UserCardProps) {
  const { push } = useRouter();

  return (
    <Flex
      borderRadius="md"
      bgColor={useColorModeValue("whiteAlpha.800", "blackAlpha.400")}
      flexDir="row"
      p="2"
      alignItems="center"
      justify="space-between"
      border="1px"
      borderColor={"gray.100"}
      shadow={"md"}
    >
      <HStack justifyContent="start">
        <UserAvatar name={user.complete_name} status={user.status || ""} />
        <Flex
          flexDir="column"
          align="start"
          justify=""
          w="full"
          h="full"
          pl="2"
        >
          <HStack>
            <Text fontWeight="semibold">{user.complete_name} - </Text>
            <Text color="purple.400">{`(${user.user_name})`}</Text>
          </HStack>
          <HStack>
            <Text fontSize="sm">{user.title} - </Text>
            <Text fontSize="sm">{user.department.name}</Text>
          </HStack>
        </Flex>
      </HStack>

      {user.telephone && (
        <Flex
          flex="row"
          alignItems="center"
          color="purple.500"
          ml="auto"
          pr="20"
        >
          <Phone weight="fill" />
          <Text pl="1" color="gray.800">
            {user.telephone}
          </Text>
        </Flex>
      )}

      <HStack spacing={4}>
        <IconButton
          aria-label="disable_user"
          icon={<Prohibit size={22} />}
          bg="none"
        />
        <IconButton
          onClick={() => push(`/users/${user.user_name}`)}
          aria-label="see-more"
          icon={<CaretRight size={22} />}
          bg="none"
        />
      </HStack>
    </Flex>
  );
}
