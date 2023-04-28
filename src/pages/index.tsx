import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
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

      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 56 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Little Complete{" "}
            <Text as={"span"} color={"purple.400"}>
              {"</>"}
            </Text>
          </Heading>
          <Text color={"gray.400"} maxW={"3xl"}>
            Um pouco de tudo, de tudo um pouco. O mió dos miores.
          </Text>
          <Button
            onClick={handleSignIn}
            rounded={"full"}
            px={10}
            size={"lg"}
            colorScheme={"purple"}
            bg={"purple.400"}
            _hover={{ bg: "purple.500" }}
          >
            Entrar
          </Button>
        </Stack>
      </Container>
    </>
  );
}
