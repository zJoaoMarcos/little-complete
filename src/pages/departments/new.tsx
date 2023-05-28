import { NewDepartmentForm } from "@/components/Forms/NewDepartment";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";

export default function NewDepartment() {
  return (
    <>
      <Head>
        <title>Novo departamento</title>
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
                <VStack justify={"start"} alignItems="start">
                  <Heading as="h3" fontWeight="semibold" fontSize={18}>
                    Novo Departamento
                  </Heading>
                </VStack>
              </HStack>
            </Flex>

            <Divider />

            <NewDepartmentForm />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
