import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import {
  Box,
  Flex,
  Heading,
  Progress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Printers() {
  return (
    <>
      <Head>
        <title>Printers</title>
      </Head>

      <Flex flexDir="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box
            flex="1"
            h="full"
            p="8"
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            overflowX="auto"
            borderRadius="md"
          >
            <Heading>Impressoras</Heading>

            <Text textAlign="center" my={20} fontSize="3xl" animation="running">
              Novidades em breve... 🚀
            </Text>

            <Progress value={70} size="xs" hasStripe colorScheme="purple" />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
