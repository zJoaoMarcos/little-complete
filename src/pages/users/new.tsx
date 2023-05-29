import { NewUserForm } from "@/components/Forms/NewUserForm";
import { Layout } from "@/components/Layout";
import { Button, Divider, Flex, Heading, HStack } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function NewDepartment() {
  const [isSending, setIsSending] = useState(false);

  return (
    <>
      <Head>
        <title>Novo usuário</title>
      </Head>

      <Layout>
        <Flex mb="10" justify="space-between" align="center">
          <HStack spacing={8}>
            <Heading as="h3" fontWeight="semibold" fontSize={18}>
              Novo Usuário
            </Heading>
          </HStack>
          <Button
            type="submit"
            form="create_user"
            colorScheme="purple"
            isLoading={isSending}
          >
            Enviar
          </Button>
        </Flex>

        <Divider />

        <NewUserForm isSending={isSending} setIsSending={setIsSending} />
      </Layout>
    </>
  );
}
