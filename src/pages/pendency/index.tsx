import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { PendencyTabs } from "@/components/Tabs/Pendency";
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";

export default function Pendency() {
  return (
    <>
      <>
        <Head>
          <title>Pendências</title>
        </Head>

        <Flex flexDir="column" h="100vh">
          <Header />

          <Flex w="100%" py="30" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

            <Box
              flex="1"
              h="full"
              p="8"
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              overflowX="auto"
              borderRadius="md"
            >
              <Flex>
                <Heading as="h3" fontWeight="semibold">
                  Pendências
                </Heading>
              </Flex>

              <PendencyTabs />
            </Box>
          </Flex>
        </Flex>
      </>
    </>
  );
}
