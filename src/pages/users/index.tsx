import { Header } from "@/components/Header";
import { CreateUserTrigger } from "@/components/Modals/User/CreateUser/Trigger";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { TableUser } from "@/components/Tables/TableUsers";
import { useUsersList } from "@/hooks/UseUserList";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function User() {
  const [page, setPage] = useState(1);
  const take = 1;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useUsersList(page, skip, take);

  return (
    <>
      <Head>
        <title>Users</title>
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
                Usuários
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="white" ml="4" />
                )}
              </Heading>

              <CreateUserTrigger />
            </Flex>
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : (
              <TableUser users={data.users} />
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
