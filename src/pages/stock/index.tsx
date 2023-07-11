import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";

import { Layout } from "@/components/Layout";
import { StockList } from "@/components/Lists/StockList";
import { TriggerNewItemModal } from "@/components/Modals/RegisterNewItemModal/Trigger";
import { NextPageWithLayout } from "../_app";

const Stock: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Stock</title>
      </Head>

      <Flex mb="8" justify="space-between" align="center">
        <Heading as="h2" fontWeight="semibold" size="lg">
          Estoque
        </Heading>

        <TriggerNewItemModal />
      </Flex>

      <StockList />
    </>
  );
};

Stock.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};

export default Stock;
