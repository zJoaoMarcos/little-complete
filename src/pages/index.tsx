import { SignInForm } from "@/components/Forms/SignInForm";
import { Logo } from "@/components/Logo";
import { withSSRGuest } from "@/utils/withSSRGuest";
import Head from "next/head";

export default function Home() {
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
          <SignInForm />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
