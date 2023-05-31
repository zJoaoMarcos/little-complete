import { Layout } from "@/components/Layout";
import { TriggerCreate } from "@/components/Modals/Create/Trigger";
import { Pagination } from "@/components/Pagination";
import { TableStock } from "@/components/Tables/TableStock";
import { useStockList } from "@/hooks/UseStockList";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Stock: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const take = 10;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useStockList(page, skip, take);

  return (
    <>
      <Head>
        <title>Stock</title>
      </Head>

      <Flex mb="8" justify="space-between" align="center">
        <Heading as="h3" fontWeight="semibold">
          Estoque
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
    </>
  );
};

Stock.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};

export default Stock;
