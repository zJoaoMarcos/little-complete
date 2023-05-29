import { NewEquipmentForm } from "@/components/Forms/NewEquipmentForm";
import { Layout } from "@/components/Layout";
import { Button, Divider, Flex, Heading, HStack } from "@chakra-ui/react";
import Head from "next/head";

export default function NewEquipment() {
  return (
    <>
      <Head>
        <title>Novo Equipamento</title>
      </Head>

      <Layout>
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

        <NewEquipmentForm />
      </Layout>
    </>
  );
}
