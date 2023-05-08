import { DepartmentProfileGrid } from "@/components/Grids/DepartmentProfileGrid";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getDepartment } from "@/hooks/UseFetchDepartment";
import { concatFirstNameAndLastName } from "@/utils/concatFIrstNameAndLastName";
import { formatData } from "@/utils/formatData";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";

interface DepartmentProps {
  department: {
    id: number;
    name: string;
    cost_center: string;
    is_board: boolean;
    board: string;
    responsible_id: string;
  };
}

export default function Department({ department }: DepartmentProps) {
  const [isEditable, setIsEditable] = useState(true);

  return (
    <>
      <Head>
        <title> Profile</title>
      </Head>

      <Flex flexDir="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" pb="10">
          <Sidebar />

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
              <Button
                colorScheme="purple"
                onClick={() => setIsEditable(!isEditable)}
              >
                Editar
              </Button>
            </Flex>

            <Divider />

            <DepartmentProfileGrid
              department={department}
              isEditable={isEditable}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async ({ params }) => {
  const id = Number(params.id);

  const { department } = await getDepartment(id);

  return {
    props: {
      department,
    },
  };
};
