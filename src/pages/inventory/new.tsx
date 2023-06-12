import { CreateNewEquipmentForm } from "@/components/Forms/CreateNewEquipmentForm";
import { Layout } from "@/components/Layout";
import { Button, Divider, Flex, Heading, HStack } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";

export default function NewEquipment() {
  return (
    <>
      <Head>
        <title>Novo Equipamento</title>
      </Head>

      <Flex mb="10" justify="space-between" align="center">
        <HStack spacing={8}>
          <Heading as="h3" fontWeight="semibold" fontSize={18}>
            Novo Equipamento
          </Heading>
        </HStack>
        <Button type="submit" form="create_equipment" colorScheme="purple">
          Enviar
        </Button>
      </Flex>

      <Divider />

      <CreateNewEquipmentForm />
    </>
  );
}

NewEquipment.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};
