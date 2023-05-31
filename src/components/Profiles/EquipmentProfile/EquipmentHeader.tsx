import { EquipmentAvatar } from "@/components/Avatars/EquipmentAvatar";
import { EquipmentBagdeStatus } from "@/components/Avatars/EquipmentAvatar/EquipmentBadgeStatus";
import { TriggerUpdateEquipmentStatus } from "@/components/Modals/UpdateEquipmentStatus/Trigger";
import { Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";

interface EquipmentHeaderProps {
  equipment: {
    id: string;
    type: string;
    status: string | null;
  };
}

export function EquipmentHeader({ equipment }: EquipmentHeaderProps) {
  return (
    <Flex mb="10" justify="space-between" align="center">
      <HStack spacing={8}>
        <EquipmentAvatar type={equipment.type!} avatarSize="lg" iconSize="40" />

        <VStack justify={"start"} alignItems="start">
          <Heading as="h3" fontWeight="semibold" fontSize={18}>
            {equipment.type} -{" "}
            <Text as="span" color="purple.400">
              {equipment.id}
            </Text>
          </Heading>

          <Text fontWeight="semibold" fontSize={16}>
            Status: <EquipmentBagdeStatus status={equipment.status || ""} />
          </Text>
        </VStack>
      </HStack>
      {equipment.status !== "pendency" && (
        <TriggerUpdateEquipmentStatus
          currentStatus={equipment.status!}
          equipment_id={equipment.id}
        />
      )}
    </Flex>
  );
}
