import { Header } from "@/components/Header";
import { TriggerCreate } from "@/components/Modals/Create/Trigger";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { TableStock } from "@/components/TableStock";
import { useShopList } from "@/hooks/UseShopList";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function Shop() {
  const [page, setPage] = useState(1);
  const take = 10;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useShopList(page, skip, take);
  return (
    <>
      <Head>
        <title>Shop List</title>
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
                Stock
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="white" ml="4" />
                )}
              </Heading>

              <TriggerCreate />
            </Flex>
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : (
              <TableStock items={data?.items} />
            )}

            <Pagination
              currentPage={page}
              onPageChange={setPage}
              registersPerPage={take}
              totalCountofRegisters={data?.totalCount!}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
