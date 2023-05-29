import { Select } from "@/components/Form/Select";
import { Layout } from "@/components/Layout";
import { UsersList } from "@/components/Lists/UserLists";
import { Pagination } from "@/components/Pagination";
import useDebounce from "@/hooks/UseDebounce";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { Button, Flex, HStack, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Users() {
  const [filter, setFilter] = useState("todos");
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
    status: filter,
  });

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <Layout setWords={setWords}>
        <Flex mb="8" justify="space-between" align="center">
          <HStack alignItems="center" justifyContent="center" spacing={"14"}>
            <Heading as="h3" fontWeight="semibold">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="white" ml="4" />
              )}
            </Heading>

            <Select
              name="filter"
              onChange={(e) => setFilter(e.target.value)}
              variant="unstyled"
              _hover={{ bg: "none" }}
              _placeholder={{ mt: "2px" }}
              size="sm"
            >
              {defaultOptions.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.option}
                  </option>
                );
              })}
            </Select>
          </HStack>

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

const defaultOptions = [
  {
    value: "todos",
    option: "Todos",
  },
  {
    value: "vacation",
    option: "Férias/Afastado",
  },
  {
    value: "active",
    option: "Ativo",
  },
  {
    value: "disabled",
    option: "Desligado",
  },
];
