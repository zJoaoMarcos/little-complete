import { Flex, HStack, Link, Text, VStack } from "@chakra-ui/react";

import { EquipmentAvatar } from "@/components/Avatars/EquipmentAvatar";
import { EquipmentBagdeStatus } from "@/components/Avatars/EquipmentAvatar/EquipmentBadgeStatus";
import { TriggerUpdateEquipmentStatus } from "@/components/Modals/UpdateEquipmentStatusModal/Trigger";
import { User } from "@phosphor-icons/react";
import { HeaderProps } from "./types";

export function Header({ equipment }: HeaderProps) {
  return (
    <Flex mb="10" justify="space-between" align="center">
      <HStack spacing={8}>
        <EquipmentAvatar type={equipment.type} avatarSize="lg" iconSize="40" />

        <VStack justify={"start"} alignItems="start">
          <HStack>
            {equipment.type && (
              <Text as="h3" fontWeight="semibold" fontSize={18}>
                {equipment.type}
              </Text>
            )}
            <Text as="span" color="purple.400">
              {equipment.id}
            </Text>
          </HStack>

          {equipment.currentUser && (
            <HStack align="center" justify="center">
              <User weight="bold" size={20} />
              <Link
                color="purple.400"
                fontWeight="semibold"
                href={`/users/${equipment.currentUser}`}
              >
                {equipment.currentUser}
              </Link>
              <p>|</p>
              <Text fontWeight="semibold" fontSize={16}>
                status: <EquipmentBagdeStatus status={equipment.status} />
              </Text>
            </HStack>
          )}
        </VStack>
      </HStack>

      <TriggerUpdateEquipmentStatus
        currentStatus={equipment.status!}
        equipment_id={equipment.id}
      />
    </Flex>
  );
}
