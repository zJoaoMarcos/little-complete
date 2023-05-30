import { Select } from "@/components/Form/Select";
import { UsersList } from "@/components/Lists/UserLists";
import { UsersListSkeleton } from "@/components/Lists/UserLists/UsersListSkeleton";
import { Pagination } from "@/components/Pagination";
import { useUser } from "@/contexts/Users";

import { Layout } from "@/components/Layout";
import { Button, Flex, HStack, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";
import { NextPageWithLayout } from "../_app";

const Users: NextPageWithLayout = () => {
  const { data, isLoading, isFetching, setFilter, page, setPage, take } =
    useUser();

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

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

      {isLoading && <UsersListSkeleton />}
      {data?.users && <UsersList users={data.users} />}

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        registersPerPage={take}
        totalCountofRegisters={data?.totalCount!}
      />
    </>
  );
};

function UsersLayout({ children }: { children: ReactNode }) {
  const { setSearch } = useUser();

  return <Layout setWords={setSearch}>{children}</Layout>;
}

Users.getLayout = function getLayout(children: ReactElement) {
  return <UsersLayout>{children}</UsersLayout>;
};

export default Users;

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
