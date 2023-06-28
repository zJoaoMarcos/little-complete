import { Flex, HStack, Text, VStack } from "@chakra-ui/react";

import { EquipmentAvatar } from "@/components/Avatars/EquipmentAvatar";
import { EquipmentBagdeStatus } from "@/components/Avatars/EquipmentAvatar/EquipmentBadgeStatus";
import { TriggerUpdateEquipmentStatus } from "@/components/Modals/UpdateEquipmentStatusModal/Trigger";
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

          <Text fontWeight="semibold" fontSize={16}>
            Status: <EquipmentBagdeStatus status={equipment.status} />
          </Text>
        </VStack>
      </HStack>

      <TriggerUpdateEquipmentStatus
        currentStatus={equipment.status!}
        equipment_id={equipment.id}
      />
    </Flex>
  );
}
