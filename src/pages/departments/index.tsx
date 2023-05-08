import { Header } from "@/components/Header";
import { DepartmentsList } from "@/components/Lists/DepartmentsList";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function Departments() {
  const [page, setPage] = useState(1);
  const take = 20;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useFetchDepartmentsList(
    page,
    skip,
    take
  );

  return (
    <>
      <Head>
        <title>Departamentos</title>
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
            <Flex mb="8" justify="space-between" align="center">
              <Heading as="h3" fontWeight="semibold">
                Departamentos
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="white" ml="4" />
                )}
              </Heading>
            </Flex>
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : (
              <DepartmentsList departments={data.departments} />
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
