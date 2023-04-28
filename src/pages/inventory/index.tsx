import { Header } from "@/components/Header";
import { CreateEquipmentTrigger } from "@/components/Modals/Equipment/CreateEquipment/Trigger";
import { Sidebar } from "@/components/Sidebar";
import { TableInventory } from "@/components/Tables/TableInventory";
import { useInvetoryList } from "@/hooks/UseInventoryList";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function Equipment() {
  const [page, setPage] = useState(1);
  const take = 10;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useInvetoryList(page, skip, take);

  return (
    <>
      <Head>
        <title>Inventário</title>
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
            <Flex mb="8" justify="space-between" align="center">
              <Heading as="h3" fontWeight="semibold">
                Inventário
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="white" ml="4" />
                )}
              </Heading>

              <CreateEquipmentTrigger />
            </Flex>
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : (
              <TableInventory equipments={data.equipments} />
            )}

            {/* <Pagination
          currentPage={page}
          onPageChange={setPage}
          registersPerPage={take}
          totalCountofRegisters={data?.totalCount!}
        /> */}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
