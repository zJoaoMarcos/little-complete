import { Header } from "@/components/Header";
import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { useFetchInvetoryList } from "@/hooks/UseFetchInventoryList";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Inventory() {
  const [page, setPage] = useState(1);
  const take = 26;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useFetchInvetoryList(
    page,
    skip,
    take
  );

  const { push } = useRouter();

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

              <Button
                colorScheme="purple"
                onClick={() => push("inventory/new")}
              >
                + Novo Equipamento
              </Button>
            </Flex>
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : (
              <EquipmentsList equipments={data?.equipments!} />
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
