import { CreateNewUserForm } from "@/components/Forms/CreateNewUserForm";
import { Layout } from "@/components/Layout";
import { Button, Divider, Flex, HStack, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";

const NewDepartment: NextPageWithLayout = () => {
  const [isSending, setIsSending] = useState(false);

  return (
    <>
      <Head>
        <title>Novo usuário</title>
      </Head>

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

      <CreateNewUserForm isSending={isSending} setIsSending={setIsSending} />
    </>
  );
};

NewDepartment.getLayout = function getLayout(chidren: ReactElement) {
  return <Layout>{chidren}</Layout>;
};

export default NewDepartment;
