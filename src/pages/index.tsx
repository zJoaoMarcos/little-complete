import { Input } from "@/components/Form/input";
import { Logo } from "@/components/Logo";
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
      </Head>

      <div className="w-screen h-screen flex flex-col justify-center sm:flex-row gap-8 p-4">
        <div className="flex flex-col gap-2 p-2 items-center sm:items-start justify-center">
          <Logo />

          <p className="font-semibold md:text-3xl mt-4 flex-wrap text-purple-500 sm:w-80">
            De tudo um pouco, de pouco um tudo. O mió dos miores
          </p>
        </div>

        <div className="flex flex-col items-center justify-center sm:w-full sm:max-w-[660px]">
          <div className="flex flex-col bg-gray-200 gap-4 rounded-md p-6 sm:p-10 w-full sm:w-3/4 ">
            <Input name="email" type="string" label="E-mail" />
            <Input name="password" type="password" label="Senha" />

            <button className="w-full py-2 bg-purple-600 rounded-md text-white font-semibold">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
