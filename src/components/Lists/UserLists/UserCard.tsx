import {
  Avatar,
  AvatarBadge,
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
    department_id: string;
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date;
    demission_date: Date | null;
    status: string;
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
        <Avatar name={user.complete_name}>
          <AvatarBadge borderColor="papayawhip" bg="tomato" boxSize="1em" />
        </Avatar>
        <Flex
          flexDir="column"
          align="start"
          justify=""
          w="full"
          h="full"
          pl="2"
        >
          <HStack>
            <Text>{user.complete_name}- </Text>
            <Text>{`(${user.user_name.trim()})`}</Text>
          </HStack>
          <HStack>
            <Text>{user.title} - </Text>
            <Text>{user.department_id}</Text>
          </HStack>
        </Flex>
      </HStack>

      {user.telephone && (
        <Flex flex="row" align="center" color="purple.500">
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
