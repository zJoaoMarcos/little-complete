import { Layout } from "@/components/Layout";
import { PendencyTabs } from "@/components/Tabs/Pendency";
import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";

export default function Pendency() {
  return (
    <>
      <Head>
        <title>Pendências</title>
      </Head>

      <Flex>
        <Heading as="h3" fontWeight="semibold">
          Pendências
        </Heading>
      </Flex>

      <PendencyTabs />
    </>
  );
}

Pendency.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};
