import { NewDepartmentForm } from "@/components/Forms/NewDepartment";
import { Layout } from "@/components/Layout";
import { Divider, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";

export default function NewDepartment() {
  return (
    <>
      <Head>
        <title>Novo departamento</title>
      </Head>

      <Flex mb="10" justify="space-between" align="center">
        <HStack spacing={8}>
          <VStack justify={"start"} alignItems="start">
            <Heading as="h3" fontWeight="semibold" fontSize={18}>
              Novo Departamento
            </Heading>
          </VStack>
        </HStack>
      </Flex>

      <Divider />

      <NewDepartmentForm />
    </>
  );
}

NewDepartment.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};
