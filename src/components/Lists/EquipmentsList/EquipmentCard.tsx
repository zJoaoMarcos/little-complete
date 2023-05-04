import {
  Avatar,
  AvatarBadge,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CaretRight, Desktop, Prohibit } from "@phosphor-icons/react";
import { useRouter } from "next/router";

interface EquipmentCardProps {
  equipment: {
    id: string;
    brand: string;
    model: string;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: string | null;
    department: string;
    status: string;
    cpu: string | null;
    ram: string | null;
    slots: number | null;
    storage0_type: string | null;
    storage0_syze: number | null;
    storage1_type: string | null;
    storage1_syze: number | null;
    video: string | null;
    service_tag: string | null;
  };
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
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
        <Avatar icon={<Desktop />}>
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
            <Text fontWeight="semibold">Notebook -</Text>
            <Text fontWeight="semibold" color="purple.300">
              ({equipment.brand} {equipment.model})
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="sm">{equipment.id}</Text>
          </HStack>
        </Flex>
      </HStack>

      <HStack spacing={4}>
        <IconButton
          aria-label="disable_user"
          icon={<Prohibit size={22} />}
          bg="none"
        />
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