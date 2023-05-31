import { Layout } from "@/components/Layout";
import { TriggerCreate } from "@/components/Modals/Create/Trigger";
import { Pagination } from "@/components/Pagination";
import { TableStock } from "@/components/Tables/TableStock";
import { useShopList } from "@/hooks/UseShopList";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Shop: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const take = 10;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useShopList(page, skip, take);
  return (
    <>
      <Head>
        <title>Shop List</title>
      </Head>

      <Flex mb="8" justify="space-between" align="center">
        <Heading as="h3" fontWeight="semibold">
          Lista de Compras
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

Shop.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};

export default Shop;
