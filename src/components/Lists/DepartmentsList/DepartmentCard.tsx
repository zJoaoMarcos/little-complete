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
    name: string;
    cost_center: string;
    is_board: boolean;
    board: string;
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
    >
      <HStack justifyContent="start">
        <Avatar icon={<Buildings />} bgColor="red.700" />
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
            <Text as="span" color="gray.300">
              ({department.board})
            </Text>
          </Text>

          <Text fontSize="sm" color="purple.300">
            {department.cost_center}
          </Text>
        </Flex>
      </HStack>

      <IconButton
        onClick={() => push(`/departments/${department.name}`)}
        aria-label="see-more"
        icon={<CaretRight size={22} />}
        bg="none"
      />
    </Flex>
  );
}
