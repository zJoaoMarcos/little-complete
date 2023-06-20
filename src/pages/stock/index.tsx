import { Layout } from "@/components/Layout";
import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Stock: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Stock</title>
      </Head>

      <Flex mb="8" justify="space-between" align="center">
        <Heading as="h3" fontWeight="semibold">
          Estoque
        </Heading>
      </Flex>
    </>
  );
};

Stock.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};

export default Stock;
