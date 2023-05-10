import { NewEquipmentProfileGrid } from "@/components/Grids/NewEquipmentProfileGrid";
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

export default function NewEquipment() {
  return (
    <>
      <Head>
        <title>Novo Equipamento</title>
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
                  Novo Equipamento
                </Heading>
              </HStack>
              <Button
                type="submit"
                form="create_equipment"
                colorScheme="purple"
              >
                Salvar
              </Button>
            </Flex>

            <Divider />

            <NewEquipmentProfileGrid />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
