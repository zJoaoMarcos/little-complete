import { Layout } from "@/components/Layout";
import { UsersList } from "@/components/Lists/UserLists";
import { Pagination } from "@/components/Pagination";
import useDebounce from "@/hooks/UseDebounce";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Users() {
  const [words, setWords] = useState("");
  const debouncedWords = useDebounce(words, 500);

  const [page, setPage] = useState(1);
  const take = 20;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useFetchUsersList({
    page,
    skip,
    take,
    id: debouncedWords,
  });

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <Layout setWords={setWords}>
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
      </Layout>
    </>
  );
}
