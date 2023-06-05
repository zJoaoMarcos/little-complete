import { EquipmentAvatar } from "@/components/Avatars/EquipmentAvatar";
import { TriggerUnassignEquipment } from "@/components/Modals/UnassignEquipment/Trigger";
import {
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CaretRight } from "@phosphor-icons/react";
import { useRouter } from "next/router";

interface EquipmentCardProps {
  equipment: {
    id: string;
    status: string;
    currentUser: string | null;
    patrimony: string | null;
    type: string | null;
    brand: string | null;
    model: string | null;
    serviceTag: string | null;
    purchase: {
      invoice: string | null;
      supplier: string | null;
      purchaseDate: Date | null;
      warranty: string | null;
    };
    department: {
      id: number | null;
      name: string | null;
    };
    config: {
      cpu: string | null;
      ram: string | null;
      video: string | null;
      storage: {
        slots: number | null;
        storage0Type: string | null;
        storage0Syze: number | null;
        storage1Type: string | null;
        storage1Syze: number | null;
      };
    };
  };
  buttonUnassign?: boolean;
}

export function EquipmentCard({
  equipment,
  buttonUnassign = false,
}: EquipmentCardProps) {
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
      borderColor={useColorModeValue("gray.100", "blackAlpha.200")}
      shadow={"md"}
    >
      <HStack justifyContent="start">
        <EquipmentAvatar
          avatarSize="md"
          iconSize="30"
          type={equipment.type}
          status={equipment.status || ""}
        />
        <Flex
          flexDir="column"
          align="start"
          justify=""
          w="full"
          h="full"
          pl="2"
        >
          <HStack>
            {(equipment.brand || equipment.model) && (
              <Text fontWeight="semibold" color="purple.300" fontSize="sm">
                ({equipment.brand} {equipment.model})
              </Text>
            )}
          </HStack>
          <HStack>
            <Text fontSize="sm">{equipment.id}</Text>
          </HStack>
        </Flex>
      </HStack>

      <HStack spacing="0.5">
        {buttonUnassign && (
          <TriggerUnassignEquipment equipmentId={equipment.id} />
        )}

        <IconButton
          onClick={() => push(`/inventory/${equipment.id}`)}
          aria-label="see-more"
          icon={<CaretRight size={22} />}
          bg="none"
        />
      </HStack>
    </Flex>
  );
}
