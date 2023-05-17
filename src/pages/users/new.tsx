import { NewUserProfileGrid } from "@/components/Grids/NewUserProfileGrid";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function NewDepartment() {
  const [isSending, setIsSending] = useState(false);

  return (
    <>
      <Head>
        <title>Novo usuário</title>
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
                <Heading as="h3" fontWeight="semibold" fontSize={18}>
                  Novo Usuário
                </Heading>
              </HStack>
              <Button
                type="submit"
                form="create_user"
                colorScheme="purple"
                isLoading={isSending}
              >
                Enviar
              </Button>
            </Flex>

            <Divider />

            <NewUserProfileGrid
              isSending={isSending}
              setIsSending={setIsSending}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
