import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getDepartment } from "@/hooks/UseFetchDepartment";
import { concatFirstNameAndLastName } from "@/utils/concatFIrstNameAndLastName";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface DepartmentProps {
  department: {
    name: string;
    cost_center: string;
    is_board: boolean;
    board: string;
  };
}

export default function User({ department }: DepartmentProps) {
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
                    {department.name}
                  </Heading>
                </VStack>
              </HStack>
            </Flex>

            <Divider />
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
  const id = decodeURIComponent(params.id);

  const { department } = await getDepartment(id);

  return {
    props: {
      department,
    },
  };
};
