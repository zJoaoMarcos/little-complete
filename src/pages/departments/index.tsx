import { Layout } from "@/components/Layout";
import { DepartmentsList } from "@/components/Lists/DepartmentsList";
import { DepartmentListSkeleton } from "@/components/Lists/DepartmentsList/Skeleton";
import { Pagination } from "@/components/Pagination";
import { useDepartment } from "@/contexts/Department";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";

export default function Departments() {
  const { data, isLoading, isFetching, page, setPage, take } = useDepartment();

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Departamentos</title>
      </Head>

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

      {isLoading && <DepartmentListSkeleton />}

      {data?.departments && <DepartmentsList departments={data.departments} />}

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        registersPerPage={take}
        totalCountofRegisters={data?.totalCount!}
      />
    </>
  );
}

function DepartmentLayout({ children }: { children: ReactNode }) {
  const { setSearch } = useDepartment();
  return <Layout setWords={setSearch}>{children}</Layout>;
}

Departments.getLayout = function getLayout(children: ReactElement) {
  return <DepartmentLayout>{children}</DepartmentLayout>;
};
