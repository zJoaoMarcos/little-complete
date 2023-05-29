import { Layout } from "@/components/Layout";
import { UsersList } from "@/components/Lists/UserLists";
import { Pagination } from "@/components/Pagination";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
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

export default function Users() {
  const [page, setPage] = useState(1);
  const take = 20;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useFetchUsersList({
    page,
    skip,
    take,
  });

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <Layout>
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

            <Button onClick={() => push("users/new")} colorScheme="purple">
              {" "}
              + Novo Usuário
            </Button>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : (
            <UsersList users={data?.users!} />
          )}

          <Pagination
            currentPage={page}
            onPageChange={setPage}
            registersPerPage={take}
            totalCountofRegisters={data?.totalCount!}
          />
        </Box>
      </Layout>
    </>
  );
}
