import { UserAvatar } from "@/components/Avatars/UserAvatar";
import { UserBagdeStatus } from "@/components/Avatars/UserAvatar/UserBadgeStatus";
import { TriggerUpdateUserStatus } from "@/components/Modals/UpdateUserStatus/Trigger";
import { concatFirstNameAndLastName } from "@/utils/concatFirstNameAndLastName";
import { Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { UserHeaderProps } from "./types";

export function UserHeader({ user }: UserHeaderProps) {
  const avatarName = concatFirstNameAndLastName(user.complete_name);

  return (
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
        currentStatus={user.status}
        useName={user.user_name}
      />
    </Flex>
  );
}
