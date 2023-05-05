import {
  Avatar,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Buildings, CaretRight } from "@phosphor-icons/react";
import { useRouter } from "next/router";

interface DepartmentCardProps {
  department: {
    id: number;
    name: string;
    cost_center: string;
    is_board: boolean;
    board: string;
    responsible_id: string;
  };
}

export function DepartmentCard({ department }: DepartmentCardProps) {
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
      _hover={{ scaleX: 1.2 }}
    >
      <HStack justifyContent="start">
        <Avatar icon={<Buildings size={20} />} bgColor="red.700" />
        <Flex
          flexDir="column"
          align="start"
          justify=""
          w="full"
          h="full"
          pl="2"
        >
          <Text fontWeight="semibold">
            {department.name} -{" "}
            <Text as="span" fontSize="sm" color="gray.600">
              ({department.board})
            </Text>
          </Text>

          <Text fontSize="sm">
            Centro de Custo: {""}
            <Text as="span" fontSize="sm" color="purple.300">
              {department.cost_center}
            </Text>
          </Text>
        </Flex>
      </HStack>

      <IconButton
        onClick={() => push(`/departments/${department.id}`)}
        aria-label="see-more"
        icon={<CaretRight size={22} />}
        bg="none"
      />
    </Flex>
  );
}
