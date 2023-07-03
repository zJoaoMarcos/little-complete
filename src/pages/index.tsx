import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";

import { Input } from "@/components/Form/input";
import { Logo } from "@/components/Logo";
import {
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

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

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        sx={{ height: "100vh" }}
      >
        <VStack alignItems="center" justifyContent="center" spacing={10} p="6">
          <Logo />

          <Text color={"gray.400"}>
            De tudo um pouco, de pouco um tudo. O mió dos miores.
          </Text>

          <Stack
            w={{ base: "320px", sm: "400px", md: "480px" }}
            p="10"
            spacing="10"
            border="1px"
            borderColor="gray.200"
            rounded="lg"
            shadow="md"
          >
            <VStack spacing="4">
              <Input name="email" placeholder="E-mail" />
              <Input name="password" placeholder="Senha" />
            </VStack>

            <Button
              onClick={handleSignIn}
              size={"lg"}
              colorScheme={"purple"}
              bg={"purple.400"}
              _hover={{ bg: "purple.500" }}
            >
              Entrar
            </Button>
          </Stack>
        </VStack>

        <Flex flex={1} display={{ base: "none", md: "block" }}>
          <Image
            src="/signin.jpg"
            alt="Image Background"
            objectFit="cover"
            sx={{ height: "100vh", width: "100vw" }}
          />
        </Flex>
      </SimpleGrid>
    </>
  );
}
