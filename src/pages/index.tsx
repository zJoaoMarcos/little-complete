import { Button, Flex, Grid, Heading, HStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/stock",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default function Home() {
  const handleSignIn = () => {
    signIn("azure-ad");
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDir="column" h="100vh" justify="center" px="20">
        <Grid templateColumns="repeat(2, 1fr)">
          <HStack>
            <Heading>Litle Complete.</Heading>
          </HStack>

          <Button onClick={handleSignIn}>Entrar</Button>
        </Grid>
      </Flex>
    </>
  );
}
