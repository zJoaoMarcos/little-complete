import { Layout } from "@/components/Layout";
import { DepartmentsList } from "@/components/Lists/DepartmentsList";
import { Pagination } from "@/components/Pagination";
import { useFetchDepartmentsList } from "@/hooks/UseFetchDepartmentsList";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
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

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Departamentos</title>
      </Head>

      <Layout>
        <Flex mb="8" justify="space-between" align="center">
          <Heading as="h3" fontWeight="semibold">
            Departamentos
            {!isLoading && isFetching && (
              <Spinner size="sm" color="white" ml="4" />
            )}
          </Heading>

          <Button colorScheme="purple" onClick={() => push("/departments/new")}>
            + Novo Departamento
          </Button>
        </Flex>
        {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          <DepartmentsList departments={data?.departments!} />
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
