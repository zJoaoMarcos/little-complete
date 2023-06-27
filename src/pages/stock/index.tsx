import { Layout } from "@/components/Layout";
import { StockList } from "@/components/Lists/StockList";
import { TriggerNewItemModal } from "@/components/Modals/RegisterNewItemModal/Trigger";
import { useStockGroupList } from "@/hooks/useStockGroupList";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Stock: NextPageWithLayout = () => {
  const { data, isFetching, isLoading } = useStockGroupList(1);

  return (
    <>
      <Head>
        <title>Stock</title>
      </Head>

      <Flex mb="8" justify="space-between" align="center">
        <Heading as="h2" fontWeight="semibold" size="lg">
          Estoque
          {!isLoading && isFetching && (
            <Spinner size="sm" color="white" ml="4" />
          )}
        </Heading>

        <TriggerNewItemModal />
      </Flex>

      {isLoading ? <Spinner /> : <StockList stockList={data?.stockList!} />}
    </>
  );
};

Stock.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};

export default Stock;
