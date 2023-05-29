import { DepartmentTab } from "@/components/Tabs/Department";
import { concatFirstNameAndLastName } from "@/utils/concatFirstNameAndLastName";
import { formatData } from "@/utils/formatData";
import { Avatar, Flex, HStack, Heading, VStack } from "@chakra-ui/react";

interface DepartmentProfileProps {
  department: {
    id: number;
    name: string;
    cost_center: number;
    is_board: boolean;
    board: string;
    responsible_id: string;
  };
}

export function DepartmentProfile({ department }: DepartmentProfileProps) {
  return (
    <>
      <Flex mb="10" justify="space-between" align="center">
        <HStack spacing={8}>
          <Avatar
            name={concatFirstNameAndLastName(department.name)}
            size="lg"
          />

          <VStack justify={"start"} alignItems="start">
            <Heading as="h3" fontWeight="semibold" fontSize={18}>
              {formatData(department.name)}
            </Heading>
          </VStack>
        </HStack>
      </Flex>

      <DepartmentTab department={department} />
    </>
  );
}
