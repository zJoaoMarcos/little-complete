import { Header } from "@/components/Header";
import { TriggerCreate } from "@/components/Modals/Create/Trigger";
import { Sidebar } from "@/components/Sidebar";
import { TableStock } from "@/components/TableStock";
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>myStock</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
            borderRadius="md"
          >
            <Flex mb="8" justify="space-between" align="center">
              <Heading as="h3" fontWeight="semibold">
                Stock
              </Heading>

              <TriggerCreate />
            </Flex>

            <TableStock />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
