import { UserAvatar } from "@/components/Avatars/UserAvatar";
import { UserBagdeStatus } from "@/components/Avatars/UserAvatar/UserBadgeStatus";
import { TriggerUpdateUserStatus } from "@/components/Modals/UpdateUserStatus/Trigger";
import { UserTab } from "@/components/Tabs/User";
import { concatFirstNameAndLastName } from "@/utils/concatFirstNameAndLastName";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

interface Equipment {
  id: string;
  type: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department: { id: number | null; name: string | null };
  status: string | null;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;
}

interface UserProfileProps {
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
    status: string;
  };

  equipments: Equipment[];
}

export function UserProfile({ equipments, user }: UserProfileProps) {
  const avatarName = concatFirstNameAndLastName(user.complete_name);
  return (
    <Box
      flex="1"
      h="full"
      p="8"
      bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
      overflowX="auto"
      borderRadius="md"
    >
      <Flex mb="10" justify="space-between" align="center">
        <HStack spacing={8}>
          <UserAvatar name={avatarName} size="lg" />

          <VStack justify={"start"} alignItems="start">
            <Heading as="h3" fontWeight="semibold" fontSize={18}>
              {user.complete_name}
            </Heading>

            <HStack>
              <Text fontWeight="semibold" fontSize={16}>
                Status:
              </Text>
              <UserBagdeStatus status={user.status} />
            </HStack>
          </VStack>
        </HStack>

        <TriggerUpdateUserStatus
          useName={user.user_name}
          currentStatus={user.status}
        />
      </Flex>

      <UserTab user={user} equipments={equipments} />
    </Box>
  );
}
